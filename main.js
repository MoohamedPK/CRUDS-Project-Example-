let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totalEle = document.querySelector(".inputs span")
let count = document.getElementById("count")
let category = document.getElementById("category");
let addBtn = document.querySelector(".create");
let deleteBtn = document.querySelector(".delete");
let search = document.getElementById("search");

// get total function 
function getTotal() {

    if (price.value !== '') {
        let total = (+price.value + +taxes.value + +ads.value - +discount.value)
        totalEle.innerHTML = total;
        totalEle.style.backgroundColor = "rgba(27, 157, 212, 0.60)";
    } else {
        totalEle.innerHTML ='';
        totalEle.style.backgroundColor = "white";
    }
}

// create product 
// options 

let data;
if (localStorage.Products != null) {
    data = JSON.parse(localStorage.Products);
    readData();
    
} else {
    data = [];
}

let date = new Date();
let mood = "create";
let dummyI;

addBtn.onclick = function createProd() {

    let dataObj = {
        date: date,
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: totalEle.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,
    };
    
    if (title.value != ''&& price.value != "" && taxes.value != ""&& ads.value != ""&& discount.value != ""&& category.value != "") {
        if (mood === "create") {
        if (dataObj.count > 1) {
        for (let i = 0; i < dataObj.count; i++ ) {
            data.push(dataObj);
        }
    }else {
        data.push(dataObj);
    }
} else {
    data[dummyI] = dataObj;
    mood = "create";
    count.style.display = "block";
    addBtn.innerHTML = "+ Add Product";
}
    clearInputs();
}

    // save data in localstorage 
    localStorage.setItem("Products", JSON.stringify(data));
    readData();
}

// when you click the create button clean the inputs 
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totalEle.innerHTML = "";
    category.value = "";
    count.value = "";
}

// when you click the button = read the data 
function readData() {

    getTotal();
let table;

    for(let i = 0; i < data.length; i++) {
        table += `
        <tr>
                <td>${data[i].date}</td>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>

                <td><button onclick = "updateData(${i})" class="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="delete">delete</button></td>
                </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.querySelector(".delete-all");

        if (data.length > 0) {
            deleteAll.innerHTML = ` 
                <button onclick = "deleteAll()" class="delete-all">Delete All (${data.length})</button>
            `;
        }else {
            deleteAll.innerHTML = '';
        }
    }

// delete product function 
function deleteProduct(i) {

    data.splice(i,1);
    localStorage.Products = JSON.stringify(data);
    readData();
}

// delete all function 
function deleteAll() {
    localStorage.clear();
    data = [];
    readData();
}

// update 
function updateData(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    count.style.display = "none"
    getTotal();
    category.value = data[i].category;
    addBtn.innerHTML = "Update"
    mood = 'update';
    dummyI = i;

    scroll({
        top:0,
        behavior: "smooth",
    })
}

// search 
let searchMood = 'title'; 

function switchSearchMood(type) {
    
    if (type === 's-title') {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder = "Search By "+ searchMood;
    search.focus();
    search.value = "";
    readData();
}

// search data function 
function searchData (value) {
    let table = '';

    for (let i = 0; i < data.length; i++) {
        if (searchMood == 'title') {

            if (data[i].title.includes(value.toLowerCase())) {
            table += `
        <tr>
                <td>${data[i].date}</td>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>

                <td><button onclick = "updateData(${i})" class="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="delete">delete</button></td>
                </tr>
        `;
            }

        }else {
            if (data[i].category.includes(value.toLowerCase())) {
            table += `
        <tr>
                <td>${data[i].date}</td>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>

                <td><button onclick = "updateData(${i})" class="update">update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="delete">delete</button></td>
                </tr>
        `;
            }
    }
}
    document.getElementById("tbody").innerHTML = table;
}