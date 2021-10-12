import { getTeddy } from "./function.js"

// Contenu panier sous forme d'array accessible depuis la page panier
const panier = JSON.parse(localStorage.getItem("panier"))
console.log(panier)


// Afficher panier vide (et cacher les elements inutiles si panier est vide)

if (panier === null) {
    console.log(`salut: ` + panier)
    document.querySelector(".clearpanier").style.display = 'none'
    document.querySelector(".tableaupanier").style.display = 'none'
    document.querySelector(".paniervide").innerHTML = `Votre panier est vide. <br>Remplissez le en vous rendant sur <a class="lienretour" href="index.html">cette page</a>.`
}
// Vider le panier

document.querySelector(".clearpanier").addEventListener('click', () => {

    localStorage.removeItem("panier")
    location.reload(true)

})

async function main() {
    const teddiesPromises = panier.map(item => getTeddy(item.id))
    const teddies = await Promise.all(teddiesPromises)

    panier.forEach(cartItem => { // cartItem c'est quoi ici? nom d'une fonction? ************* ??
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)

        // console.table(teddy)
        // console.table(cartItem)

        addTeddyToDom(teddy, cartItem.quantity)


    })

    // calculer prix total ***
    let prixTotalCalcul = 0;
    panier.forEach(cartItem => { // cartItem c'est quoi ici? nom d'une fonction? ************** ??
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)

        prixTotalCalcul += cartItem.quantity * teddy.price

    })
    console.log(prixTotalCalcul)

    //Affichage du prix total
    const prixTotalCalculEnEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotalCalcul / 100)
    document.querySelector(".totalfinal").innerText = `Le montant total de votre panier est de : ` + prixTotalCalculEnEuro
}

// 

main()



const templateItemCart = document.querySelector(".itemcart").content
const articles = document.querySelector(".tableaupanier")

function addTeddyToDom(teddy, quantite) {
    const article = templateItemCart.cloneNode(true)

    //Calcul total et convert currency
    const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    const priceTotal = quantite * teddy.price
    const priceTotalEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceTotal / 100)
    // const qtyActuelle = document.getElementById('myField').value
    // Inject DOM
    article.querySelector(".tname").innerText = teddy.name
    article.querySelector(".tqty").innerText = quantite
    article.querySelector(".tprice").innerText = price
    article.querySelector(".ttotal").innerText = priceTotalEuro

    article.querySelector(".deleteitem").innerHTML = `<a href="" class="deleteitem__btn"><i class="far fa-trash-alt"></i></a>`

    article.querySelector(".modifierquantite").innerHTML = `<form class="selectqtymain" action="" method="POST" id="selectqty">
                                                                 <input class="selectqty" type="number" id="selectqty" name="selectqty" value="" min="1" max="10">
                                                                 <input type="submit" href="" class="modifierquantite__btn" value="✔">
                                                             </form>`
    articles.appendChild(article)


}



// Supprimer un article du panier

// document.querySelector(".deleteitem").addEventListener('click', () => {
//     removeLocalStorageValues()
//     main()
// })













// for (let p = 0; p < panier.length; p++) {
//     console.log(panier[p].id)
// }
// console.log()



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

