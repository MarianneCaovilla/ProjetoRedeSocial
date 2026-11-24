var API_URL = "https://ifsp.trojahn.uk/redesocial";

async function getUsers() {
    const response = await fetch(`${API_URL}/usuarios/`);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return await response.json();
}

async function getPosts() {
    const response = await fetch(`${API_URL}/posts/`);

    if (!response.ok) {
        throw new Error("Erro ao buscar posts");
    }

    return await response.json();
}

async function getPostsId(id) {
    const response = await fetch(`${API_URL}/posts/${id}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar posts");
    }

    return await response.json();
}

async function getComents(id) {
    const response = await fetch(`${API_URL}/posts/${id}/comentarios`);

    if (!response.ok) {
        throw new Error("Erro ao buscar os comentarios");
    }

    return await response.json();
}

async function checkUser(token) {
    const response = await fetch(`${API_URL}/usuarios/check`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = new Error("Erro ao verificar autenticação");
        error.status = response.status;
        throw error;
    }

    return await response.json();
}

async function getLikes(id) {
    const response = await fetch(`${API_URL}/posts/${id}/likes`);

    if (!response.ok) {
        throw new Error("Erro ao buscar curtidas");
    }

    return await response.json();
}

