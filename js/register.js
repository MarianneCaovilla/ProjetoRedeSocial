import { createUser } from "./services/postService.js";

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
