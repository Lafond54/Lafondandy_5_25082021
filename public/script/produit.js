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
console.table(teddiesApiUrl)
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
    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    article.querySelector(".card__divimg__item").src = teddy.imageUrl
    article.querySelector(".card__d__name").innerText = teddy.name
    article.querySelector(".card__d__price").innerText = price
    article.querySelector(".card__d__descr").innerText = teddy.description
    //article.querySelector(".article").setAttribute("href", "produit.html?id=" + teddy._id)
    articles.appendChild(article)

    console.log(teddy)

    // Ecoute du bouton enclenchant la fonction d'ajout d'un nonours dans le panier
    document.querySelector(".card__d__add").addEventListener('click', (e) => {
        e.preventDefault()
        addTeddyToCart(teddy)
        notifAjoutPanier()
    })

}



// Notif ajout panier
function notifAjoutPanier () {
const qtyAjoute = document.getElementById("selectqtyid").value
let small = document.querySelector(".smallajout")
            small.innerHTML = `✔ Vous avez ${qtyAjoute} exemplaire(s) de cet article dans votre panier.`         
            small.classList.add('.ajout')
}


//
async function refresh() {
    articles.innerHTML = ""
    const teddy = await getTeddy(teddyApiUrl)  // Pourquoi je peux pas recuperer teddy dans d'autres endroits que ces fonctions là
    addTeddyToDom(teddy)

}

refresh()






//Fonction ajout nounours dans le panier

function addTeddyToCart(teddy) {



    //variable panier = la chaine de caractere de ( la valeur associé à la clé ) reconstruite en valeur JS OU= array vide
    const panier = JSON.parse(localStorage.getItem("panier")) || []
    console.log(panier) // marche pas, normal ?

    //variable teddyCart = chercher dans le panier si il exite un Id stocké dans teddyCart correpondant à un ID de l'objet teddy
    let teddyCart = panier.find((teddyCart) => teddyCart.id === teddy._id)
    console.log(teddyCart)
    // Si teddyCart est faux, alors on injecte une valeur par defaut dans teddycart
    if (!teddyCart) {
        teddyCart = { id: teddy._id, quantity: 0 }

        panier.push(teddyCart)
    }
   
    //si teddyCart est vrai, alors on injecte la quantité presente dans l'input selectQty
    teddyCart.quantity = document.getElementById("selectqtyid").value
    //Duo clé valeur ajouté dans le localstorage en chaine de caractere
    localStorage.setItem("panier", JSON.stringify(panier))

}

    










