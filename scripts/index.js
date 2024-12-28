const form = document.getElementById('form');
form.addEventListener('submit', function() {
    event.preventDefault();

    let email = form.email.value;
    let password = form.password.value;

    //valide credentials:
    // Email: admin@empher.com
    // Password: empher@123

    //addmin login
    if(email == 'admin@empher.com' && password == 'empher@123'){
        let userDataObject = {email, password} ;
        let data = JSON.stringify(userDataObject);
        localStorage.setItem("loginData", data);
        
        alert("Logged in as Admin");
        document.location.href = 'admin.html';
    }
    else if(email == 'user@empher.com' && password == 'user@123'){

        //store user data in local storeage
        let userDataObject = {email, password} ;
        let data = JSON.stringify(userDataObject);
        localStorage.setItem("loginData", data);

        alert("User Login success");
        document.location.href = 'books.html';
    }
    else {
        console.error('failed to login');
    }

})