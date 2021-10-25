const resultOrderId = JSON.parse(localStorage.getItem("resOrderId"))

console.table(resultOrderId)

console.log(resultOrderId.contact.firstName)

document.querySelector(".confirm__felicitation").innerHTML = `Félicitation ${resultOrderId.contact.firstName}, <br> votre commande a bien été prise en compte !`

document.querySelector(".confirm__orderid").innerHTML =  resultOrderId.orderId

