
//Variable http de l'API
const teddiesApiUrl = "http://localhost:3000/api/teddies"




export async function getTeddy(id) {
    //Variable egale à Concatenation Url + ID
    const url = teddiesApiUrl.concat(`/` + id)
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw res
        }
        return await res.json();
    }
    catch (err) {
        console.error(err)
    }

}


