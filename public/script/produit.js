//API local
//const teddies = [{ "colors": ["Tan", "Chocolate", "Black", "White"],
// "_id": "5be9c8541c9d440000665243", "name": "Norbert", "price": 2900, "imageUrl": "http://localhost:3000/images/teddy_1.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Pale brown", "Dark brown", "White"], "_id": "5beaa8bf1c9d440000a57d94", "name": "Arnold", "price": 3900, "imageUrl": "http://localhost:3000/images/teddy_2.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Brown"], "_id": "5beaaa8f1c9d440000a57d95", "name": "Lenny and Carl", "price": 5900, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_3.jpg" }, { "colors": ["Brown", "Blue", "Pink"], "_id": "5beaabe91c9d440000a57d96", "name": "Gustav", "price": 4500, "imageUrl": "http://localhost:3000/images/teddy_4.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Beige", "Tan", "Chocolate"], "_id": "5beaacd41c9d440000a57d97", "name": "Garfunkel", "price": 5500, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_5.jpg" }]



// ******************************
//Obtention de l'ID de la page
import { getTeddy, getPanier } from "./function.js"
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
console.log(".card")

//Variable constante cible la div qui recoit  le futur article
const articles = document.querySelector(".articleproduit")
console.log(articles)


//fonction 



// fonction modif DOM

function addTeddyToDom(teddy) {
    const article = templatecard.cloneNode(true)

    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    article.querySelector(".card__divimg__item").src = teddy.imageUrl
    article.querySelector(".card__d__name").innerText = teddy.name
    article.querySelector(".card__d__price").innerText = `Prix : ${price}`
    article.querySelector(".card__d__descr").innerText = teddy.description
    // article.getElementById('color').value = teddy.colors        *** Marche pas *** boucle for of ou forEach document.createElement de type option (select?)
    articles.appendChild(article)

    // console.log(teddy.colors)

    // Ecoute du bouton enclenchant la fonction d'ajout d'un nonours dans le panier
    document.querySelector(".card__d__add").addEventListener('click', (e) => {
        e.preventDefault()
        addTeddyToCart(teddy)
        notifAjoutPanier()
        setTimeout(function () {
             document.querySelector(".smallajout").remove();
        }, 4500)

    })
  
    // Notif ajout panier
    function notifAjoutPanier() {
        let small = document.querySelector(".smallajout")
        let divcontainer = document.querySelector(".container3")
         const qtyAjoute = document.getElementById("selectqtyid").value        
         small.innerHTML = `✔ Vous avez ajouté ${qtyAjoute} exemplaire(s) de cet article dans votre panier.`
        
        let newDiv = document.createElement("div")
        newDiv.classList.add('smallajout')
      
       
        //  small.innerHTML = `✔ Vous avez ajouté ${qtyAjoute} exemplaire(s) de cet article dans votre panier.`

        divcontainer.appendChild(newDiv)

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

function addTeddyToCart(teddy) {



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
    teddyCart.quantity += parseInt(document.getElementById("selectqtyid").value)
    //Duo clé valeur ajouté dans le localstorage en chaine de caractere
    localStorage.setItem("panier", JSON.stringify(panier))

}












