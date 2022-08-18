// //////////variables
let text = document.getElementById("text")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let temp;
let mood = "create"



// get total

function getTotal() {
    if (price.value != "") {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.innerHTML = result
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#dc3545";
        total.innerHTML = ""

    }
}



// creat product

let dataPro
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}
submit.onclick = function createPro() {

    let newPro = {
        text: text.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()

    }
    if(text.value !=''&& price.value && newPro.count<100 && category.value !=''){
       if (mood === "create") {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro)

            }

        } else {
            dataPro.push(newPro)
        }
    } else {
        dataPro[temp] = newPro
        count.style.display = "block"
        submit.innerHTML = "create"
        mood = "create"
        showdata()
    } 
    clearData()
    showdata()

    }
   

    console.log(dataPro);
    localStorage.setItem("product", JSON.stringify(dataPro))
    showdata()
}



// clear data
function clearData() {
    text.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}



// get data
showdata()
function showdata() {
    getTotal()
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
        table += `
 
                   <tr class=" my-3">
                    <td >${[i+1]}</td>
                    <td>${dataPro[i].text}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatData(${i})" id="update" class="btn btn-info mx-2">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
                  </tr>
`
    }
    let tbody = document.getElementById("tbody").innerHTML = table
    let clearData = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        clearData.innerHTML = `<button onclick="deleteAll()"  type="button"  class="btn btn-danger w-100 my-3 rounded-pill">delete all (${dataPro.length})</button> `
    } else {
        clearData.innerHTML = ''

    }
}
// deleta all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showdata()
}
// delete product
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showdata()
}
// update data
function updatData(i) {
    text.value = dataPro[i].text
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    getTotal()
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    count.style.display = "none"
    submit.innerHTML = "Update"
    mood = "update"
    temp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search Mood
let searchmood ='title'

function searchMood(id){
    let search=document.getElementById("search")

    if (id==="searchByTitle") {
        searchmood="title"
    } else {
        searchmood="category"  
    }
    search.placeholder='search By '+searchmood
search.focus()
search.value=''
showdata()
}


// search
function search(value){
let table=''    
for (let i = 0; i < dataPro.length; i++) {
    if (searchmood=="title") {
if(dataPro[i].text.includes(value.toLowerCase())){
    table += `
 
    <tr class=" my-3">
     <td >${[i]}</td>
     <td>${dataPro[i].text}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount} </td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick="updatData(${i})" id="update" class="btn btn-info mx-2">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
   </tr>
` 
}

    }else{
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
         
            <tr class=" my-3">
             <td >${[i]}</td>
             <td>${dataPro[i].text}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updatData(${i})" id="update" class="btn btn-info mx-2">update</button></td>
             <td><button onclick="deleteData(${i})" id="delete" class="btn btn-danger">delete</button></td>
           </tr>
        ` 
        }
    }
    
}
let tbody = document.getElementById("tbody").innerHTML = table

}

