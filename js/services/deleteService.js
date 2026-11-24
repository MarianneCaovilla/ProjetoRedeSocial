var API_URL = "https://ifsp.trojahn.uk/redesocial";

async function deletePost(id, token) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        const error = new Error(erro.msg || "Erro ao excluir post");
        error.status = response.status;
        throw error;
    }

    return true;
}

async function deleteComment(id, token) {
    const response = await fetch(`${API_URL}/comentarios/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        const error = new Error(erro.msg || "Erro ao excluir comentário");
        error.status = response.status;
        throw error;
    }

    return true;
}

