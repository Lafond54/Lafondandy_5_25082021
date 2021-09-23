
// Contenu panier sous forme d'array accessible depuis la page panier
const panier = JSON.parse(localStorage.getItem("panier"))
console.log(panier)


//********affichage des produits du panier**********
const elementPanier = document.querySelector(".tableaupanier__body")
console.log(elementPanier)

//Si le panier est vide : afficher le panier vide

if (panier === null) {
    const panierVide = `<div class=container-panier-vide>Votre Panier est vide </div>`
    elementPanier.innerHTML = panierVide
}
else {
    //si le panier est pas vide
    structureProduitPanier = []

    for (i = 0; i < panier.length; i++) {
        console.log(`Nbre d'elements dans le local storage (pas la quantite) = ` + panier.length)

        structureProduitPanier = structureProduitPanier + `
        <tr>
        <td>${panier[i].id}</td>
        <td>${panier[i].quantity}</td>        
        <td>100€</td>
        <td>addition du total</td>
        </tr>
        `

    }
    if( i== panier.length) {
        //injection html dans page panier
        
        elementPanier.innerHTML = structureProduitPanier
        console.log(structureProduitPanier)
    }
    
}
