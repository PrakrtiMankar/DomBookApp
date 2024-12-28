

// login data retrived from local storage
let data = localStorage.getItem("loginData");
let loginData = JSON.parse(data);

console.log(loginData);

if(loginData == null || loginData.email != 'admin@empher.com'){
    alert('Admin Not Logged In');
    document.location.href = 'index.html';
}
