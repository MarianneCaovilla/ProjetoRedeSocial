const API_URL = "https://ifsp.trojahn.uk/redesocial"

export async function createPost(texto, img, token) {
    const response = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            texto: texto,
            img: img
        })
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.msg);
    }
    return true;
}

export async function createComents(texto, id, token){
    const response = await fetch(`${API_URL}/posts/${id}/comentarios`,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            texto: texto
        })
    })
    if(!response.ok){
        throw new Error("Erro em postar o comentário.")
    }
    return await response.json();
}

export async function createUser(nome, login, senha, img) {
    const response = await fetch(`${API_URL}/usuarios/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            login: login,
            senha: senha,
            img: img
        })
    });
    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.msg);
    }
    return await response.json();
}

export async function loginUser(login, senha) {
    const response = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login,
            senha: senha
        })
    });
    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.msg);
    }
    return await response.json();
}

export async function toggleLike(id, token) {
    const response = await fetch(`${API_URL}/posts/${id}/likes`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.msg);
    }
    return true;
}