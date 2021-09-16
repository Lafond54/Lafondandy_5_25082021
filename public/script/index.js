//API local
//const teddies = [{ "colors": ["Tan", "Chocolate", "Black", "White"],
// "_id": "5be9c8541c9d440000665243", "name": "Norbert", "price": 2900, "imageUrl": "http://localhost:3000/images/teddy_1.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Pale brown", "Dark brown", "White"], "_id": "5beaa8bf1c9d440000a57d94", "name": "Arnold", "price": 3900, "imageUrl": "http://localhost:3000/images/teddy_2.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Brown"], "_id": "5beaaa8f1c9d440000a57d95", "name": "Lenny and Carl", "price": 5900, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_3.jpg" }, { "colors": ["Brown", "Blue", "Pink"], "_id": "5beaabe91c9d440000a57d96", "name": "Gustav", "price": 4500, "imageUrl": "http://localhost:3000/images/teddy_4.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Beige", "Tan", "Chocolate"], "_id": "5beaacd41c9d440000a57d97", "name": "Garfunkel", "price": 5500, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_5.jpg" }]



//variable http de l'API
const teddiesApiUrl = "http://localhost:3000/api/teddies"

//variable constante nommé templatearticle cible la div template 
const templatearticle = document.querySelector("#templatearticle").content
console.log(templatearticle)


//variable constante cible la div principale contenant tous les articles templates
const articles = document.querySelector(".articles")
console.log(articles)

//fonction 
async function getTeddies() {
    try {
        const res = await fetch(teddiesApiUrl)
        if (!res.ok) {
            throw res
        }
        return await res.json();
    }
    catch (err) {
        console.error(err)
    }
}

// fonction

function addTeddyToDom(teddy) {
    const article = templatearticle.cloneNode(true)
    article.querySelector(".article__image").src = teddy.imageUrl
    article.querySelector(".article__titre").innerText = teddy.name
    article.querySelector(".article__soustitre").innerText = teddy.price  / 100 + "€" // Numberformat ou cette methode suffit ?

    let prixApi = teddy.price
    console.log(prixApi)


    article.querySelector(".article").setAttribute("href", "produit.html?id=" + teddy._id)
    articles.appendChild(article)
 


}



// ******************************
// Conversion Centimes en Euros
const article = templatearticle
let prix = article.querySelector(".article__soustitre").innerText // Surement Mauvais ciblage 
let valeurPrix = prix.value // Undefined

console.log(valeurPrix)


function conversionEuro(a, b) {
    let c = a / b;
    console.log(c)        // NaN
}

conversionEuro(prix, 100)

// ******************************


//fonction
async function refresh() {
    articles.innerHTML = ""
    const teddies = await getTeddies()
    teddies.forEach(addTeddyToDom)


}

refresh()
/*
//teddies.forEach(teddy => {
    addTeddyToDom(teddy)
})
*/






