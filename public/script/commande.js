import { getTeddy } from "./function.js"

// Contenu panier sous forme d'array accessible depuis la page panier
const panier = JSON.parse(localStorage.getItem("panier"))
console.log(panier[1])


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

// main ***********
async function main() {
    const teddiesPromises = panier.map(item => getTeddy(item.id)) //commande.js:27 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'map')
    const teddies = await Promise.all(teddiesPromises)


    panier.forEach(cartItem => { // cartItem c'est quoi ici? nom d'une fonction? ************* ??
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)

        // console.table(teddy)
        // console.table(cartItem)

        addTeddyToDom(teddy, cartItem.quantity)


    })

    prixTotalCalculEnEuro()

}
main()


// *** // Fonction prix final en euro****
async function prixTotalCalculEnEuro() {  // Obligé d'utiliser await async afin de recuprer const teddies dans la fonction ?
    const teddiesPromises = panier.map(item => getTeddy(item.id))
    const teddies = await Promise.all(teddiesPromises)
    let prixTotalCalcul = 0;
    panier.forEach(cartItem => {
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)

        prixTotalCalcul += cartItem.quantity * teddy.price

    })
    // console.log("prix total : " + prixTotalCalcul)

    //Affichage du prix total mettre en fonction a part
    const prixTotalCalculEnEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotalCalcul / 100)
    document.querySelector(".totalfinal").innerText = `Le montant total de votre panier est de : ` + prixTotalCalculEnEuro
}



// DOM panier*********
const templateItemCart = document.querySelector(".itemcart").content
const articles = document.querySelector(".tableaupanier")

function addTeddyToDom(teddy, quantite) {
    const article = templateItemCart.querySelector(".tableaupanier__body").cloneNode(true)


    //Calcul total et convert currency
    const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
    const priceTotal = quantite * teddy.price
    const priceTotalEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceTotal / 100)

    // Inject DOM
    article.querySelector(".tname").innerText = teddy.name
    article.querySelector(".tqty").innerText = quantite
    article.querySelector(".tprice").innerText = price
    article.querySelector(".ttotal").innerText = priceTotalEuro



    article.querySelector(".modifierquantite").innerHTML = `
                                                             <form class="selectqtymain" name="selectqtymain" autocomplete="on">                    
                                                             <label for="qtyitem"></label>
                                                             <select name="choixcouleur" id="qtyitem" class="qtyitem" required>
                                                                 <option value="">${quantite}</option>
                                                                 <option value="1">1</option>
                                                                 <option value="2">2</option>
                                                                 <option value="3">3</option>
                                                                 <option value="4">4</option>
                                                                 <option value="5">5</option>
                                                                 <option value="6">6</option>
                                                                 <option value="7">7</option>
                                                                 <option value="8">8</option>
                                                                 <option value="9">9</option>
                                                                 <option value="10">10</option>
                                                             </select>
                                                             <input type="submit" href="" class="modifierquantite__btn" value="✔">
                                                         </form>`
    articles.appendChild(article)



    // Supprimer une ligne du panier
    article.querySelector(".deleteitem").addEventListener('click', (e) => {
        console.log(panier)
        e.preventDefault()
        const index = panier.findIndex(cartItem => cartItem.id === teddy._id)
        panier.splice(index, 1)

        localStorage.setItem("panier", JSON.stringify(panier))
        console.log(article)
        article.remove()
        // Reafficher a nouveau le Prix Final après suppression d'une ligne     
        document.querySelector(".totalfinal").innerText = ""
        prixTotalCalculEnEuro()
    })

    // Modifier la quantité d'un article depuis le panier
    let qtySelectionne = article.querySelector(".qtyitem")
    qtySelectionne.addEventListener('change', function () {
        // article.querySelector(".tqty").innerText = qtySelectionne.value
        
        const indexQty = panier.findIndex(cartItem => cartItem.id === teddy._id)
       
            // quantité de l'item dans le panier actuel
            let valeurQtyPanier = panier[indexQty].quantity            


        //    valeurQtyPanier = qtySelectionne.value // oK , ca change la quantite dans la console et ensuite ?

            
            // panier.splice(valeurQtyPanier, 1, qtySelectionne)
            // panier.splice(panier.findIndex(({Qtysearch}) => Qtysearch == panier.quantity), 1, qtySelectionne);

            console.log(panier) // n'affiche rien
            localStorage.setItem("panier", JSON.stringify(panier))
            
        console.log("qty dans panier : " + valeurQtyPanier)       
        console.log("index du panier n : " + indexQty)
        
         
        // localStorage.setItem("panier", JSON.stringify(panier))
    })



    // // Ecouter changement de quantité pour agir ensuite sur le panier
    // article.querySelector(".tqty").addEventListener('change', event => {
    //     window.alert('prixChange' + event)
    //     console.log("changement")
    //     //   const value = event.target.value
    //     //   panier = 
    // })



}
















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

