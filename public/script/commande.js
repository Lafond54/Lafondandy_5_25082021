import { getTeddy } from "./function.js"

// Contenu panier sous forme d'array accessible depuis la page panier
const panier = JSON.parse(localStorage.getItem("panier"))


// Vider le panier

document.querySelector(".clearpanier").addEventListener('click', () => {

    localStorage.removeItem("panier")
    location.reload(true)

})

async function main() {
    const teddiesPromises = panier.map(item => getTeddy(item.id))
    const teddies = await Promise.all(teddiesPromises)

    panier.forEach(cartItem => { // cartItem c'est quoi ici? nom d'une fonction? ******************************** ??
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)
        console.table(teddy)
        console.table(cartItem)
        function appelPanier() {
            (addTeddyToDom(teddy, cartItem))
        }
        
        appelPanier()
    })
}

// 

main()



const templateItemCart = document.querySelector(".itemcart").content
const articles = document.querySelector(".tableaupanier")
function addTeddyToDom(teddy, panier) {   // teddy et panier ici ??? ***
    const article = templateItemCart.cloneNode(true)

    //Calcul total et convert currency
    const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    const priceTotal = panier.quantity * teddy.price
    const priceTotalEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceTotal / 100)
    // Inject DOM
    article.querySelector(".tname").innerText = teddy.name
    article.querySelector(".tqty").innerText = panier.quantity
    article.querySelector(".tprice").innerText = price
    article.querySelector(".ttotal").innerText = priceTotalEuro
    articles.appendChild(article)


}

// let prixTotalCalcul = [];

// for (let p = 0; p < panier.length; p++) {
//     console.log(panier[p].id)
// }




//  Modif DOm ***************




// //Variable http de l'API
// let teddiesApiUrl = "http://localhost:3000/api/teddies"

// //Variable egale à Concatenation Url + ID
// let teddyApiUrl = teddiesApiUrl.concat(`/` + id)

// Boucle sur le tableau d'ojets du LS pour obtenir la liste des IDs dans le chariot
// for (i = 0; i < panier.length; i++) {
//     let chariot = panier[i]
//     console.log(chariot)

// }



// //********affichage des produits du panier**********
// const elementPanier = document.querySelector(".tableaupanier__body")
// console.log(elementPanier)

// //Si le panier est vide : afficher le panier vide

// if (panier === null) {
//     const panierVide = `<div class=container-panier-vide>Votre Panier est vide </div>`
//     elementPanier.innerHTML = panierVide
// }
// else {
//     //si le panier est pas vide
//     structureProduitPanier = []

//     for (i = 0; i < panier.length; i++) {
//         console.log(`Nbre d'elements dans le local storage (pas la quantite) = ` + panier.length)

//         structureProduitPanier = structureProduitPanier + `
//         <tr>
//         <td>${panier[i].id}</td>
//         <td>${panier[i].quantity}</td>        
//         <td>100€</td>
//         <td>addition du total</td>
//         </tr>
//         `

//     }
//     if (i == panier.length) {
//         //injection html dans page panier

//         elementPanier.innerHTML = structureProduitPanier

//     }

// }









// Formulaire ********************

let form = document.querySelector('#purchaseform')


//ecouter la modification de l'email

form.email.addEventListener('change', function () {

    validEmail(this)
})

const validEmail = function (inputEmail) {
    // Creation de la RegExp pour la validation email
    let emailRegExp = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'g')
    //Confrontation mail avec les regles du Regexp renvoit du booleen
    let testEmail = emailRegExp.test(inputEmail.value)
    console.log(testEmail)
    // selectionner balise small
    let small = inputEmail.nextElementSibling
    // Message dans la balise small selon le resultat booleen precedent (ligne62)
    if (testEmail == true) {
        small.innerHTML = "✔ Adresse Valide"
        small.classList.remove('__notok')    // Enlever couleur precedente
        small.classList.add('__ok')          // couleur message de validation
    } else {
        small.innerHTML = "✗ Adresse Non Valide"
        small.classList.remove('__ok')
        small.classList.add('__notok')
    }
}












// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then((values) => {
//     console.log(values);
// });
// // expected output: Array [3, 42, "foo"]

//  //////////////////////////////////////////////////////////////////////

// async () => {
//     const products = await Promise.all(
//         cartProducts
//         .reduce((acc, cartProduct) => {
//             acc.add(cartProduct.id)
//         }, new Set())
//         .map(getProductData)
//     )