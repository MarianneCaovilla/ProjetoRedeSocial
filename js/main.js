import { getPosts } from "./services/getService.js";
import { getUsers } from "./services/getService.js";

const postsContainer = document.getElementById("posts-container");

async function carregarPosts() {
    try {
        const posts = await getPosts();
        const usuarios = await getUsers();


        postsContainer.innerHTML = "";

        if (posts.length === 0) {
            postsContainer.textContent = "Nenhuma publicação encontrada.";
            return; 
        }
        
        posts.forEach(post => {

            const div = document.createElement("div");
            div.classList.add("post");

            const avatar = document.createElement("img");

            const autor = usuarios.find(usuario => usuario.id === post.id);
            avatar.onerror = () => {
            avatar.onerror = null;
            avatar.src = "./images/avatar.png";
            };

            avatar.src = autor.img || "./images/avatar.png";

            avatar.classList.add("avatar");

            const p = document.createElement("p");
            p.textContent = post.texto;

            const img = document.createElement("img");
            img.src = post.img;
            img.classList.add("post-image");

            
            div.appendChild(avatar);
            div.appendChild(p);
            div.appendChild(img);
            postsContainer.appendChild(div);
        }
);

    } catch (error) {
        console.error("Erro ao carregar posts:", error);
        postsContainer.textContent = "Não foi possível carregar as publicações.";
    }
}

carregarPosts();