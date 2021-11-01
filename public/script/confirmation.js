// analyse de resultOrderId du LS pour le transformer en objet JS
const resultOrderId = JSON.parse(localStorage.getItem("resOrderId"))
console.table(resultOrderId)

// Inject DOM Du prénom et OrderID
document.querySelector(".confirm__felicitation").innerHTML = `Félicitation ${resultOrderId.contact.firstName}, <br> votre commande a bien été prise en compte !`
document.querySelector(".confirm__orderid").innerHTML =  resultOrderId.orderId

