var API_URL = "https://ifsp.trojahn.uk/redesocial";

async function updatePost(id, texto, img, token) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
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
        const erro = await response.json().catch(() => ({}));
        const error = new Error(erro.msg || "Erro ao editar post");
        error.status = response.status;
        throw error;
    }

    return true;
}

async function updateComment(id, texto, token) {
    const response = await fetch(`${API_URL}/comentarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            texto: texto
        })
    });

    if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        const error = new Error(erro.msg || "Erro ao editar comentário");
        error.status = response.status;
        throw error;
    }

    return true;
}
