import { getTeddy, getPanier } from "./function.js"

// Contenu panier sous forme d'array accessible depuis la page panier
const panier = getPanier()
console.log(panier)

async function getTeddies() {
    if (!getTeddies.teddies) {
        const teddiesPromises = panier.map(item => getTeddy(item.id)) //commande.js:27 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'map')
        getTeddies.teddies = await Promise.all(teddiesPromises)

    }
    return getTeddies.teddies
}




// Afficher panier vide (et cacher les elements inutiles si panier est vide)

if (panier.length === 0) {
    console.log(`panier vide: ` + panier)
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
    //commande.js:27 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'map')

    const teddies = await getTeddies()


    panier.forEach(cartItem => {
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
                                                             <select class="qtyitem" required>
                                                                 <option value="" selected="true" disabled="disabled">${quantite}</option>
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
                                                        `
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


        const item = panier.find(cartItem => cartItem.id === teddy._id)

        // quantité de l'item dans le panier actuel
        // let valeurQtyPanier = panier[indexQty].quantity            


        item.quantity = parseInt(qtySelectionne.value)  // Ajout de parseInt pour eviter que la Qty se transforme en string de la localstorage

        console.log(item.quantity)
        console.log(typeof qtySelectionne.value)

        // panier.splice(valeurQtyPanier, 1, qtySelectionne)
        // panier.splice(panier.findIndex(({Qtysearch}) => Qtysearch == panier.quantity), 1, qtySelectionne);

        console.log(panier) // n'affiche rien
        localStorage.setItem("panier", JSON.stringify(panier))
        article.querySelector(".tqty").innerText = qtySelectionne.value
        prixTotalCalculEnEuro()
        const priceTotal = item.quantity * teddy.price // <=
        const priceTotalEuro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceTotal / 100)


        article.querySelector(".ttotal").innerText = priceTotalEuro

        // localStorage.setItem("panier", JSON.stringify(panier))
    })


}


// *********** POST / ORDER *************

// Declaration variable formulaire
let formMain = document.querySelector(".formmain")

const formFirstName = document.getElementById("firstname")
const formLastName = document.getElementById("lastname")
const formAdress = document.getElementById("adress")
const formCity = document.getElementById("city")
const formEmail = document.getElementById("email")



// Submit lance l'envoie de l'objet Contact + tableau de string ID


document.getElementById("purchaseform").addEventListener('submit', async (e) => {

    e.preventDefault()
    // Creation tableau "products" de string d'IDs
    let products = []
    for (let i = 0; i < panier.length; i++) {

        products.push(panier[i].id)
    }
    console.log(products)

    // Object contact
    let contact = {
        firstName: formFirstName.value,
        lastName: formLastName.value,
        address: formAdress.value,
        city: formCity.value,
        email: formEmail.value
    }



    if (products.length > 0) {  // Rajouter une condition de validation de formulaire pour lancer le POST
        // e.preventDefault()


        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify({ contact, products }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            }
        })


        try {
            console.log(response)
            const contenu = await response.json()
            console.table(contenu)
            localStorage.setItem("resOrderId", JSON.stringify(contenu))
            let verifLs = localStorage.resOrderId
            console.log("LS etat : " + verifLs)
            console.log(localStorage)

            let LS = localStorage.getItem("resOrderId")
            console.log(LS)
            window.location = "confirmation.html"
        } catch (e) {
            console.error(e)

        }

        

    }

})











// RegExp Email du formulaire ********************

let form = document.getElementById('purchaseform')

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
    } else {
        small.innerHTML = "✗ Adresse Non Valide"
    }
}

