//variable http de l'API
const teddiesApiUrl = "http://localhost:3000/api/teddies"


//Fetch **** 
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

//DOM ****
//variable constante nommé templatearticle cible la div template 
const templatearticle = document.querySelector("#templatearticle").content


//variable constante cible la div principale contenant tous les articles templates
const articles = document.querySelector(".articles")

// fonction ajout teddy au DOM
function addTeddyToDom(teddy) {
    const article = templatearticle.cloneNode(true)
    let price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(teddy.price / 100)
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







