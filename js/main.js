const postsContainer = document.getElementById("posts-container");
const token = localStorage.getItem("token");
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

let usuarios = [];

async function carregarPosts() {
    try {
        const posts = await getPosts();
        posts.sort((a, b) => new Date(b.data) - new Date(a.data));
        usuarios = await getUsers();

        postsContainer.innerHTML = "";

        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post");

            const autor = usuarios.find(u => u.id === post.usuario);

            const header = document.createElement("div");
            header.classList.add("post-header");

            const avatar = document.createElement("img");
            avatar.src = autor?.img || "./images/avatar.png";
            avatar.classList.add("avatar");

            avatar.onerror = () => {
                avatar.onerror = null;
                avatar.src = "./images/avatar.png";
            };

            const nome = document.createElement("h3");
            nome.textContent = autor?.nome || "Usuário desconhecido";

            header.appendChild(avatar);
            header.appendChild(nome);

            const dataPost = document.createElement("span");
            dataPost.textContent = new Date(post.data).toLocaleDateString("pt-BR");

            header.appendChild(dataPost);

            if (usuarioLogado && usuarioLogado.id === post.usuario) {

                const editar = document.createElement("button");
                editar.textContent = "Editar";

                editar.addEventListener("click", () => {
                    abrirEdicao(post);
                });

                const excluir = document.createElement("button");
                excluir.textContent = "Excluir";

                excluir.addEventListener("click", () => {
                    abrirExclusao(post);
                });

                header.appendChild(editar);
                header.appendChild(excluir);
            }

            div.appendChild(header);

            if (post.img) {
                const img = document.createElement("img");
                img.src = post.img;
                img.classList.add("post-image");
                div.appendChild(img);
            }

            const p = document.createElement("p");
            p.textContent = post.texto;
            div.appendChild(p);

            const coracao = document.createElement("img");
            coracao.classList.add("heart");
            coracao.src = "./images/heart.png";
            coracao.alt = "Curtir publicação";

            if (usuarioLogado) {
                const curtido = post.likes.find(
                    like => like.usuario === usuarioLogado.id
                );

                if (curtido) {
                    coracao.src = "./images/heart-liked.png";
                    coracao.alt = "Remover curtida";
                }
            }

            coracao.addEventListener("click", async () => {
                if (!token) {
                    alert("Faça login para curtir!");
                    return;
                }

                try {
                    await toggleLike(post.id, token);
                    await carregarPosts();

                } catch (error) {
                    tratarErro(error);
                }
            });

            const likes = document.createElement("span");
            likes.textContent = post.likes.length + " curtidas";

            div.appendChild(coracao);
            div.appendChild(likes);

            const botaoComentarios = document.createElement("button");
            botaoComentarios.textContent = "Ver comentários (" + post.comentarios.length + ")";
            botaoComentarios.classList.add("botao-comentarios");

            const comentarios = document.createElement("div");
            comentarios.classList.add("comments");
            comentarios.hidden = true;

            post.comentarios.forEach(comentario => {
                comentarios.appendChild(carregarComentarios(comentario));
            });

            botaoComentarios.addEventListener("click", () => {
                comentarios.hidden = !comentarios.hidden;

                if (comentarios.hidden) {
                    botaoComentarios.textContent = "Ver comentários (" + post.comentarios.length + ")";
                } else {
                    botaoComentarios.textContent = "Ocultar comentários";
                }
            });

            div.appendChild(botaoComentarios);
            div.appendChild(comentarios);

            if (usuarioLogado && token) {
                const formComentario = document.createElement("form");
                formComentario.classList.add("comment-form");

                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Escreva um comentário...";

                const botao = document.createElement("button");
                botao.type = "submit";
                botao.textContent = "Comentar";

                formComentario.addEventListener("submit", async (event) => {
                    event.preventDefault();

                    if (input.value.trim() === "") {
                        return;
                    }

                    try {
                        await createComents(input.value, post.id, token);
                        await carregarPosts();
                    } catch (error) {
                        tratarErro(error);
                    }
                });

            formComentario.appendChild(input);
            formComentario.appendChild(botao);
            div.appendChild(formComentario);
        }

            postsContainer.appendChild(div);
        });

    } catch (error) {
        postsContainer.textContent = error.message;
    }
}

function carregarComentarios(comentario) {
    const autor = usuarios.find(
        u => u.id === comentario.usuario
    );

    const div = document.createElement("div");
    div.classList.add("comment");

    const avatar = document.createElement("img");
    avatar.src = autor?.img || "./images/avatar.png";
    avatar.classList.add("avatar");

    avatar.onerror = () => {
        avatar.onerror = null;
        avatar.src = "./images/avatar.png";
    };

    const conteudo = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = autor?.nome || "Usuário desconhecido";

    const p = document.createElement("p");
    p.textContent = comentario.texto;

    conteudo.appendChild(nome);
    conteudo.appendChild(p);

    div.appendChild(avatar);
    div.appendChild(conteudo);

    if (usuarioLogado && usuarioLogado.id === comentario.usuario) {
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", async () => {
            try {
                await deleteComment(comentario.id, token);
                await carregarPosts();
            } catch (error) {
                tratarErro(error);
            }
        });

        const editar = document.createElement("button");
        editar.textContent = "Editar";

        editar.addEventListener("click", () => {
        abrirEdicaoComentario(comentario);
        });

        div.appendChild(editar);

        div.appendChild(excluir);

    }

    return div;
}

const nav = document.getElementById("nav");
const createPostSection = document.getElementById("create-post");

if (usuarioLogado && token) {

    nav.innerHTML = "";

    const nome = document.createElement("span");
    nome.textContent = usuarioLogado.nome;

    const sair = document.createElement("button");
    sair.textContent = "Sair";

    sair.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        window.location.reload();
    });

    nav.appendChild(nome);
    nav.appendChild(sair);

    createPostSection.hidden = false;
}

const postForm = document.getElementById("post-form");
const mensagem = document.getElementById("post-mensagem");

postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const texto = document.getElementById("post-texto").value;
    const img = document.getElementById("post-img").value;

    if (!token || !usuarioLogado) {
        mensagem.textContent = "Faça login para publicar.";
        return;
    }

    if (texto.trim() === "") {
        mensagem.textContent = "Digite o texto da publicação.";
        return;
    }

    try {
        await createPost(texto, img || null, token);

        postForm.reset();
        mensagem.textContent = "";

        await carregarPosts();

    } catch (error) {
        if (error.message === "Token inválido") {
            sessaoExpirada();
        } 
        else {
            mensagem.textContent = error.message;
        }
    }
});


function abrirEdicao(post) {
    const modal = document.getElementById("edit-modal");
    const texto = document.getElementById("edit-texto");
    const salvar = document.getElementById("save-edit");
    const cancelar = document.getElementById("cancel-edit");

    texto.value = post.texto;

    modal.showModal();

    cancelar.onclick = () => {
        modal.close();
    };

    salvar.onclick = async () => {

        if (texto.value.trim() === "") {
            return;
        }

        try {
            await updatePost(post.id, texto.value, post.img, token);

            modal.close();

            await carregarPosts();

        } catch (error) {
            tratarErro(error);
        }
    };
}

function abrirEdicaoComentario(comentario) {
    const modal = document.getElementById("edit-modal");
    const texto = document.getElementById("edit-texto");
    const salvar = document.getElementById("save-edit");
    const cancelar = document.getElementById("cancel-edit");

    texto.value = comentario.texto;

    modal.showModal();

    cancelar.onclick = () => {
        modal.close();
    };

    salvar.onclick = async () => {
        if (texto.value.trim() === "") {
            return;
        }

        try {
            await updateComment(comentario.id, texto.value, token);

            modal.close();

            await carregarPosts();

        } catch (error) {
            tratarErro(error);
        }
    };
}

function abrirExclusao(post) {
    const modal = document.getElementById("delete-modal");
    const excluir = document.getElementById("confirm-delete");
    const cancelar = document.getElementById("cancel-delete");

    modal.showModal();

    cancelar.onclick = () => {
        modal.close();
    };

    excluir.onclick = async () => {
        try {
            await deletePost(post.id, token);

            modal.close();

            await carregarPosts();

        } catch (error) {
            tratarErro(error);
        }
    };
}

function sessaoExpirada() {
    alert("Você não está mais logado. Faça login novamente.");
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "./pages/login.html";
}

function tratarErro(error) {
    if (error.status === 401 || error.status === 403) {
        sessaoExpirada();
    } else {
        alert(error.message);
    }
}

async function verificarSessao() {
    if (!token) return;

    try {
        await checkUser(token);
    } catch (error) {
        if (error.status === 401 || error.status === 403) {
            sessaoExpirada();
        } else {
            console.error("Erro ao verificar sessão:", error);
        }
    }
}

(async () => {
    await verificarSessao();
    await carregarPosts();
})();