import { getTeddy, getPanier, createNotif, conversionEnEuro } from "./function.js"

//Variable du tableau panier
const panier = getPanier()
console.log(panier)

// Creer un objet teddies à la fonction getTeddies dans lequel on stocke une donnéee
async function getTeddies() {
    if (!getTeddies.teddies) {
        const teddiesPromises = panier.map(item => getTeddy(item.id))
        getTeddies.teddies = await Promise.all(teddiesPromises)
    }
    return getTeddies.teddies
}

// Afficher panier vide (et cacher les elements inutiles si panier est vide)

if (panier.length === 0) {
    console.log(`panier vide: ` + panier)
    document.querySelector(".clearpanier").style.display = 'none'
    document.querySelector(".tableaupanier").style.display = 'none'
    document.querySelector(".paniervide").innerHTML = `Votre panier est vide. <br>Remplissez le en vous rendant sur <a class="lienretour" href="index.html"><b>cette page</b></a>.`
}


// main ***********
async function main() {
    const teddies = await getTeddies()

    panier.forEach(cartItem => {
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)
        addTeddyToDom(teddy, cartItem.quantity)
    })
    prixTotalCalculEnEuro()
}

main()


// *** // Fonction prix final en euro****
async function prixTotalCalculEnEuro() {

    const teddies = await getTeddies()   
    let prixTotalCalcul = 0;

    panier.forEach(cartItem => {
        const teddy = teddies.find(teddy => teddy._id === cartItem.id)
        prixTotalCalcul += cartItem.quantity * teddy.price
    })

    //Affichage du prix total
    const prixTotalCalculEnEuro = conversionEnEuro(prixTotalCalcul)
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
    const priceTotalEuro = conversionEnEuro(priceTotal)

    // Inject DOM
    article.querySelector(".tname").innerText = teddy.name
    article.querySelector(".tqty").innerText = quantite
    article.querySelector(".tprice").innerText = price
    article.querySelector(".ttotal").innerText = priceTotalEuro

    article.querySelector(".modifierquantite").innerHTML = `                                                           
                                                             <select class="qtyitem" title="Choisir une autre quantité" required>
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



    // **** GESTION PANIER ****
    // Vider le panier
    document.querySelector(".clearpanier").addEventListener('click', () => {

        localStorage.removeItem("panier")
        location.reload(true)

    })


    // Supprimer une ligne du panier avec trash
    article.querySelector(".deleteitem").addEventListener('click', (e) => {
        console.log(panier)
        e.preventDefault()
        const index = panier.findIndex(cartItem => cartItem.id === teddy._id)
        panier.splice(index, 1)

        localStorage.setItem("panier", JSON.stringify(panier))
        console.log(article)
        article.remove()

        if (panier.length === 0) {
            localStorage.removeItem("panier")
            location.reload(true)

        }


        // Reafficher a nouveau le Prix Final après suppression d'une ligne     
        document.querySelector(".totalfinal").innerText = ""
        prixTotalCalculEnEuro()
        createNotif(`✔ Vous avez supprimé un article.`, document.querySelector(".notifmodifpanier"))
    })

    // Modifier la quantité d'un article depuis le panier
    let qtySelectionne = article.querySelector(".qtyitem")
    qtySelectionne.addEventListener('change', function () {
        const item = panier.find(cartItem => cartItem.id === teddy._id)

        item.quantity = parseInt(qtySelectionne.value)  //La value est un string, parseInt permet de le convertir en number

        localStorage.setItem("panier", JSON.stringify(panier))
        article.querySelector(".tqty").innerText = qtySelectionne.value
        prixTotalCalculEnEuro()
        const priceTotal = item.quantity * teddy.price
        const priceTotalEuro = conversionEnEuro(priceTotal)
        article.querySelector(".ttotal").innerText = priceTotalEuro
        createNotif(`✔ Vous avez modifié la quantité d'un article.`, document.querySelector(".notifmodifpanier"))
    })
}


// *********** POST / ORDER *************
// Declaration variable formulaire
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



    if (products.length > 0) {

        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify({ contact, products }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            }
        })

        try {
            const contenu = await response.json()
            localStorage.setItem("resOrderId", JSON.stringify(contenu))
            localStorage.removeItem("panier")
            window.location = "confirmation.html"
        } catch (e) {
            console.error(e)
        }
    }
})




// BONUS **
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

