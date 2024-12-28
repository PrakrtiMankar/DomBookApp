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
    let isVerfied = false;
    let isAvailable = true;
    let borwDays = 3;
    let imageUrl = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"

    let bookObject = {title, author, category, isVerfied, isAvailable, borwDays, imageUrl};

    console.log(baseUrl, bookObject);

    //post request to Json server
    fetch(`${baseUrl}/books`, {
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

});

//display books cards
let box = document.getElementById('book-box');
// let list = document.createElement('ul');
// box.append(list);
let bookData = [];

getBookData();

function getBookData() {
    fetch(`${baseUrl}/books`)
    .then((res) => res.json())
    .then((data) => bookData = data ? data : [])
    .then(() => {
        displayBooks();
    })
    .catch((err) => console.log(err))
}


function displayBooks(){
    // getBookData();
    console.log(bookData, 'books');

    bookData.map((item, index) => {
        let verifyStatus = item.isVerfied;
        let card = document.createElement('div');
        card.innerHTML = `<div class="card">
                            <h3>Title: ${item.title}</h3>
                            <h4>Author: ${item.author}</h4>
                            <h5>Category: ${item.category}</h5>
                            
                        </div>`;
                        //<h6>Availability Status: ${item.isAvailable}</h6>
                        // <h6>Borrowed Days: ${item.borwDays}</h6>
        let verify = document.createElement('button');
        verify.disabled = verifyStatus === true ? true : false;
        verify.innerHTML = "Verify Book";
        verify.addEventListener('click', () => {
            if(confirm('Are you sure to verify..?')){
                // console.log('verified')
                verifyStatus = !item.isVerfied;
                
            };

            fetch(`${baseUrl}/books/${index+1}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({isVerfied: verifyStatus})
            })
        })

        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Delete Book";
        deleteBtn.addEventListener('click', () => {
            if(confirm('Are you sure to Delete..?')){
                

                fetch(`${baseUrl}/books/${index+1}`, {
                    method: "DELETE"
                })
                .then(() => console.log('deleted'))
                .catch((err) => console.log(err))
            };
        });

        card.append(verify);
        card.append(deleteBtn);
        box.append(card);
    })

}
