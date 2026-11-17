const API_URL = "https://ifsp.trojahn.uk/redesocial"

export async function createPost(texto, img){
    const response = await fetch(`${API_URL}/posts/`,{
        method : "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
            texto: texto,
            img: img
        })
    })
    if(!response.ok){
        throw new Error("Erro ao buscar posts")
    }

    return await response.json();

}