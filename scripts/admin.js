import {baseUrl} from './baseUrl.js';

// login data retrived from local storage
let data = localStorage.getItem("loginData");
let loginData = JSON.parse(data);

// console.log(loginData);

if(loginData == null || loginData.email != 'admin@empher.com'){
    alert('Admin Not Logged In');
    document.location.href = 'index.html';
}

//form for adding books
let form = document.getElementById('form');
form.addEventListener('submit', function() {
    event.preventDefault();

    let title = form.title.value;
    let author = form.author.value;
    let category = form.category.value;

    let bookObject = {title, author, category};

    console.log(baseUrl, bookObject);

    //post request to Json server
    fetch(`${baseUrl}/books-me2`, {
        method: "POST", 
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(bookObject)
    })
    .then((res) => (res.json()))
    .then((data) => {
        // console.log(data, "data")
        alert("Book Added Successfully");
    })
    .catch((err) => console.error())

})
