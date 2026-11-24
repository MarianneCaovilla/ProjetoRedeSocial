const form = document.getElementById("login-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
        const resultado = await loginUser(login, senha);
        localStorage.setItem("token", resultado.token);
        localStorage.setItem(
            "usuario",
            JSON.stringify(resultado.usuario)
        );
        window.location.href = "../index.html";

    } catch (error) {
        mensagem.textContent = error.message;
    }
});
