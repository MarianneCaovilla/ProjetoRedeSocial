const API_URL = "https://ifsp.trojahn.uk/redesocial"

export async function getUsers(){
        const response = await fetch(`${API_URL}/usuarios/`)
        if(!response.ok){
            throw new Error("erro ao buscar usuários")
        }
        
        return await response.json();
    
}

export async function getPosts() {
    const response = await fetch(`${API_URL}/posts/`)
    if(!response.ok){
        throw new Error("Erro ao buscar posts")
    }

    return await response.json();    
}

export async function getPostsId(id) {
    const response = await fetch(`${API_URL}/posts/${id}`)

    if(!response.ok){
        throw new Error("Erro ao buscar posts")
    }

    return await response.json();    
}
