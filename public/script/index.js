import { conversionEnEuro, getTeddies } from "./function.js"

//DOM ****
//variable constante nommé templatearticle cible la div template 
const templatearticle = document.querySelector("#templatearticle").content


//variable constante cible la div principale contenant tous les articles templates
const articles = document.querySelector(".articles")

// fonction ajout teddy au DOM
function addTeddyToDom(teddy) {
    const article = templatearticle.cloneNode(true)
    let price = conversionEnEuro(teddy.price)
    article.querySelector(".article__image").src = teddy.imageUrl
    article.querySelector(".article__titre").innerText = teddy.name
    article.querySelector(".article__soustitre").innerText = price

    article.querySelector(".article").setAttribute("href", "produit.html?id=" + teddy._id)
    articles.appendChild(article)
}



// ******************************
//fonction global
async function refresh() {
    articles.innerHTML = ""
    const teddies = await getTeddies()
    teddies.forEach(addTeddyToDom)
}

refresh()







