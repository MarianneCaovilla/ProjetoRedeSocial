const form = document.getElementById("register-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    const img = document.getElementById("img").value;

    try {
        await createUser(nome, login, senha, img);

        window.location.href = "./login.html";

    } 
    catch (error) {
        mensagem.textContent = error.message;
    }
});

const campoImg = document.getElementById("img");
const preview = document.getElementById("preview");

campoImg.addEventListener("input", () => {
    preview.src = campoImg.value || "../images/avatar.png";
});

preview.addEventListener("error", () => {
    preview.onerror = null;
    preview.src = "../images/avatar.png";
});
