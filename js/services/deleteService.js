const API_URL = "https://ifsp.trojahn.uk/redesocial";

export async function deletePost(id, token) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Erro ao excluir post");
    }
    return true;
}

export async function deleteComment(id, token) {
    const response = await fetch(`${API_URL}/comentarios/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Erro ao excluir comentário");
    }
    return true;
}
