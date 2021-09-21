//API local
//const teddies = [{ "colors": ["Tan", "Chocolate", "Black", "White"],
// "_id": "5be9c8541c9d440000665243", "name": "Norbert", "price": 2900, "imageUrl": "http://localhost:3000/images/teddy_1.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Pale brown", "Dark brown", "White"], "_id": "5beaa8bf1c9d440000a57d94", "name": "Arnold", "price": 3900, "imageUrl": "http://localhost:3000/images/teddy_2.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Brown"], "_id": "5beaaa8f1c9d440000a57d95", "name": "Lenny and Carl", "price": 5900, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_3.jpg" }, { "colors": ["Brown", "Blue", "Pink"], "_id": "5beaabe91c9d440000a57d96", "name": "Gustav", "price": 4500, "imageUrl": "http://localhost:3000/images/teddy_4.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Beige", "Tan", "Chocolate"], "_id": "5beaacd41c9d440000a57d97", "name": "Garfunkel", "price": 5500, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_5.jpg" }]



// ******************************
//Obtention de l'ID de la page
function getParameter(paramaterId) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(paramaterId);
}
console.log(window.location.search)

//Variable Chaine de caractere id isolé
let id = getParameter("id")
console.log(id)

//Variable http de l'API
let teddiesApiUrl = "http://localhost:3000/api/teddies"

//Variable egale à Concatenation Url + ID
let teddyApiUrl = teddiesApiUrl.concat(`/` + id)


// Test réponse de l'api (a supprimer)
fetch(teddyApiUrl)
    .then(res => res.json())
    .then(data => console.log(data))



// ******************************
//Variable constante nommé card cible  #templatecard
const templatecard = document.querySelector(".card").content
console.log(".card")

//Variable constante cible la div qui recoit  le futur article
const articles = document.querySelector(".articleproduit")
console.log(articles)


//fonction 
async function getTeddy(Url) {
    try {
        const res = await fetch(Url)
        if (!res.ok) {
            throw res
        }
        return await res.json();
    }
    catch (err) {
        console.error(err)
    }

}


// fonction modif DOM

function addTeddyToDom(teddy) {            //???? teddy = data ???? Par quel moyen ?
    const article = templatecard.cloneNode(true)
    article.querySelector(".card__divimg__item").src = teddy.imageUrl
    article.querySelector(".card__d__name").innerText = teddy.name
    article.querySelector(".card__d__price").innerText = teddy.price / 100 + "€"
    article.querySelector(".card__d__descr").innerText = teddy.description
    //article.querySelector(".article").setAttribute("href", "produit.html?id=" + teddy._id)
    articles.appendChild(article)

    console.log(teddy)

}


async function refresh() {
    articles.innerHTML = ""
    const teddy = await getTeddy(teddyApiUrl)  // Pourquoi je peux pas recuperer teddy dans d'autres endroits que ces fonctions là
    addTeddyToDom(teddy)

}

refresh()




// Ecoute des evenements du click du bouton ajouter


document.querySelector(".card__d__add").addEventListener('click', onClick)
function onClick(e) {

    e.preventDefault()                                                   // Permet d'empêcher le comportement naturel du lien


    //Variable dans laquelle on met les keys et valeurs qui sont dans le LS
    let produitsDansLeLS = JSON.parse(localStorage.getItem("produit")) //methode parse pour convertir le JSON en objet JS
    console.log(produitsDansLeLS)

    // Si LS est vide
    if (produitsDansLeLS) {
    }
    //Si LS n'est pas vide
    else {

        produitsDansLeLS = []
 
        console.log(produitsDansLeLS)
        localStorage.setItem("produit", JSON.stringify(produitsDansLeLS))

    }

}











/*
//teddies.forEach(teddy => {
    addTeddyToDom(teddy)
})
*/






