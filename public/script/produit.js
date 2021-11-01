// ******************************
//Obtention de l'ID de la page
import { getTeddy, getPanier, createNotif } from "./function.js"
function getParameter(paramaterId) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(paramaterId);
}
console.log(window.location.search)

//Variable Chaine de caractere id isolé
let id = getParameter("id")
console.log(id)



// ******************************
//Variable constante nommé card cible  #templatecard
const templatecard = document.querySelector(".card").content


//Variable constante cible la div qui recoit  le futur article
const articles = document.querySelector(".articleproduit")



// fonction modif DOM

function addTeddyToDom(teddy) {
    const article = templatecard.cloneNode(true)

    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    article.querySelector(".card__divimg__item").src = teddy.imageUrl
    article.querySelector(".card__d__name").innerText = teddy.name
    article.querySelector(".card__d__price").innerText = `Prix : ${price}`
    article.querySelector(".card__d__descr").innerText = teddy.description
    articles.appendChild(article)

    // Ecoute du bouton enclenchant la fonction d'ajout d'un nonours dans le panier
    document.querySelector(".card__d__add").addEventListener('click', (e) => {
        e.preventDefault()
        const quantity = parseInt(document.getElementById("selectqtyid").value)
        addTeddyToCart(teddy, quantity)
        notifAjoutPanier(quantity)
    })

    // Notif ajout panier
    function notifAjoutPanier(quantity) {
        createNotif(`✔ Vous avez ajouté ${quantity} exemplaire(s) de cet article dans votre panier.`, document.querySelector(".container3"))
    }

    // ****** Liste déroulante choix couleurs ***********
    // Selection du Parent de la liste de choix couleur
    const parent = document.querySelector(".formulaire")
    //Create and append select list
    const selectList = document.getElementById("color");
    parent.appendChild(selectList);

    // Pour chacune des couleurs on injecte le text et la valeur de la liste d'options   
    teddy.colors.forEach(function (element) {
        const option = document.createElement("option")
        option.value = element
        option.text = element
        selectList.appendChild(option)     // Required ne marche pas!
    })
}


//
async function refresh() {
    articles.innerHTML = ""
    const teddy = await getTeddy(id)
    addTeddyToDom(teddy)

}
refresh()


//Fonction ajout nounours dans le panier

function addTeddyToCart(teddy, quantity) {
    //variable panier = la chaine de caractere de ( la valeur associé à la clé ) reconstruite en valeur JS OU= array vide
    const panier = getPanier()
    console.log(panier) // marche pas, normal ?

    //variable teddyCart = chercher dans le panier si il exite un Id stocké dans teddyCart correpondant à un ID de l'objet teddy
    let teddyCart = panier.find((teddyCart) => teddyCart.id === teddy._id)

    // Si teddyCart est faux, alors on injecte une valeur par defaut dans teddycart
    if (!teddyCart) {
        teddyCart = { id: teddy._id, quantity: 0 }

        panier.push(teddyCart)
    }

    //si teddyCart est vrai, alors on injecte la quantité presente dans l'input selectQty
    teddyCart.quantity += quantity
    //Duo clé valeur ajouté dans le localstorage en chaine de caractere
    localStorage.setItem("panier", JSON.stringify(panier))
}












