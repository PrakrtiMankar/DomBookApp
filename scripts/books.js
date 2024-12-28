import {baseUrl} from './baseUrl.js';


// get book data
let bookData = [];
// getBookData();

function getBookData() {
    fetch(`${baseUrl}/books`)
    .then((res) => res.json())
    .then((data) => bookData = data ? data : [])
    .then(() => {
        displayBooks();
    })
    .catch((err) => console.log(err))
}

// login data retrived from local storage
let data = localStorage.getItem("loginData");
let loginData = JSON.parse(data);

// console.log(loginData);

if(loginData == null || loginData.email != 'user@empher.com'){
    alert('User Not Logged In');
    document.location.href = 'index.html';
}

//buttons
let AvailableBtn = document.getElementById('AvailableBtn');
let BorrowedBtn = document.getElementById('BorrowedBtn');
let box = document.getElementById('book-box');

AvailableBtn.addEventListener('click', () => {
    //display available books
    fetch(`${baseUrl}/books`)
    .then((res) => res.json())
    .then((data) => bookData = data ? data : [])
    .then(() => {
        displayAvailBooks();
    })
    .catch((err) => console.log(err))
})

function displayAvailBooks(){
    // getBookData();
    console.log(bookData, 'books');

    bookData.map((item, index) => {
        let verifyStatus = item.isVerfied;
        let card = document.createElement('div');
        card.innerHTML = `<div class="card">
                            <h3>Title: ${item.title}</h3>
                            <h4>Author: ${item.author}</h4>
                            <h5>Category: ${item.category}</h5>
                            <h6>Availability Status: ${item.isAvailable}</h6>
                            
                        </div>`;
        
        let borrowBtn = document.createElement('button');
        borrowBtn.innerHTML = "Borrow Book";
        borrowBtn.addEventListener('click', () => {
            let borrowedDays = prompt('Enter number of days you want to borrow the book?')
            // console.log(borrowedDays)

            if(borrowedDays > 0 && borrowedDays <= 10){
                // alert("book can be issued");

                fetch(`${baseUrl}/books/${index+1}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({isAvailable: false})
                })
                .then(()=>alert("Book Borrowed Successfully"))
                .then(() => displayAvailBooks())
                .catch((err) => console.error(err))
            }
            else {
                alert("Maximum borrowing days is 10");
            }

        });

        card.append(borrowBtn);

        if(item.isAvailable == true){
            box.append(card);
        }
    })

}

BorrowedBtn.addEventListener('click', () => {
    fetch(`${baseUrl}/books`)
    .then((res) => res.json())
    .then((data) => bookData = data ? data : [])
    .then(() => {
        displayBorwBooks();
    })
    .catch((err) => console.log(err));
})

function displayBorwBooks(){
    // getBookData();
    console.log(bookData, 'books');

    bookData.map((item, index) => {
        let verifyStatus = item.isVerfied;
        let card = document.createElement('div');
        card.innerHTML = `<div class="card">
                            <h3>Title: ${item.title}</h3>
                            <h4>Author: ${item.author}</h4>
                            <h5>Category: ${item.category}</h5>
                            <h6>Availability Status: ${item.isAvailable}</h6>
                            <h6>Borrowed Days: ${item.borwDays}</h6>
                        </div>`;
        
        let returnBtn = document.createElement('button');
        returnBtn.innerHTML = "Return Book";
        returnBtn.addEventListener('click', () => {
            if(confirm("Are you sure to return book..?")){
                fetch(`${baseUrl}/books/${index+1}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({borwDays: null, isAvailable: true})
                })
                .then(() => alert(Book returned successfully))
                .catch((err) => console.log(err))
            }

        });

        card.append(returnBtn);

        if(item.isAvailable == false){
            box.append(card);
        }
    })

}