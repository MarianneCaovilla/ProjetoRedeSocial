const API_URL = "https://ifsp.trojahn.uk/redesocial";

export async function updatePost(id, texto, img, token) {
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
        throw new Error(erro.msg || "Erro ao editar post");
    }
    return true;
}

export async function updateComment(id, texto, token) {
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
        throw new Error(erro.msg || "Erro ao editar comentário");
    }
    return true;
}