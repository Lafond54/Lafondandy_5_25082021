
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


export function getPanier() {
    return JSON.parse(localStorage.getItem("panier")) || []
}


export function createNotif(texte, container) {
    let newDiv = document.createElement("div")
    newDiv.classList.add('smallajout')
    newDiv.innerHTML = texte
    container.appendChild(newDiv)
    setTimeout(function () {
        newDiv.remove();
    }, 6000)
}


export function conversionEnEuro(prixcible) {
    Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixcible / 100)
}