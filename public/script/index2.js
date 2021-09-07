//API local
//const teddies = [{ "colors": ["Tan", "Chocolate", "Black", "White"],
// "_id": "5be9c8541c9d440000665243", "name": "Norbert", "price": 2900, "imageUrl": "http://localhost:3000/images/teddy_1.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Pale brown", "Dark brown", "White"], "_id": "5beaa8bf1c9d440000a57d94", "name": "Arnold", "price": 3900, "imageUrl": "http://localhost:3000/images/teddy_2.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Brown"], "_id": "5beaaa8f1c9d440000a57d95", "name": "Lenny and Carl", "price": 5900, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_3.jpg" }, { "colors": ["Brown", "Blue", "Pink"], "_id": "5beaabe91c9d440000a57d96", "name": "Gustav", "price": 4500, "imageUrl": "http://localhost:3000/images/teddy_4.jpg", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, { "colors": ["Beige", "Tan", "Chocolate"], "_id": "5beaacd41c9d440000a57d97", "name": "Garfunkel", "price": 5500, "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "imageUrl": "http://localhost:3000/images/teddy_5.jpg" }]

//variable http de l'API
let teddies = "http://localhost:3000/api/teddies"

//variable constante nommé templatearticle cible la div template 
const templatearticle = document.querySelector("#templatearticle").content
console.log(templatearticle)


//variable constante cible la div principale contenant tous les articles templates
const articles = document.querySelector(".articles")
console.log(articles)

//Appel de l'API avec fetch
fetch(teddies)
    .then(function (res) {                                      // Promesses
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (teddies) {                                   // <== teddies entre les parenthèses ?     
        teddies.forEach(teddy => {                             //Boucle qui permet d’itérer sur les propriétés d’un tableau et afficher les infos envoyés par l'API sur les articles de la home page
            const article = templatearticle.cloneNode(true)
            article.querySelector(".article__image").src = teddy.imageUrl
            article.querySelector(".article__titre").innerText = teddy.name
            article.querySelector(".article__soustitre").innerText = teddy.price
            articles.appendChild(article)
        })
    })
    .catch(function (err) { "erreurrrrr" })








