document.addEventListener("DOMContentLoaded", () => {
    // This ensures that our JavaScript doesn't run until the HTML is fully loaded.

    // Grabbing references to important DOM elements
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const newAccountForm = document.getElementById('newAccountForm');
    const uploadForm = document.getElementById('uploadForm');


    // Adding event listeners
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    if (newAccountForm) {
        newAccountForm.addEventListener('submit', handleNewAccount);
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', handleImageUpload);
    }
    
});

function handleLogin(event) {
    event.preventDefault();
    // Extract data from form
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    // Make fetch request to server
    fetch("/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.success) {
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    });
}

function handleImageUpload(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    fetch("/uploadPhoto", {
        method: 'POST',
        credentials: 'include',
        body: formData 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/"; // Redirect or handle successful upload
        } else {
            alert(data.message || "An error occurred while uploading the image.");
        }
    })
  
    .catch(error => {
        console.error("Error uploading the image:", error);
        alert("An error occurred. Please try again.");
    });
}


function handleLogout() {
    fetch("/logout", {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => {
        window.location.href = "/login";
    });
}

function handleNewAccount(event) {
    event.preventDefault();

    // input fields with these IDs from our form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const name = document.getElementById("name").value;

    // Check client-side if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Send a POST request to create a new account
    fetch("/newAccount", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, name })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect or inform the user of successful account creation
            window.location.href = "/login";
        } else {
            // Handle any errors or inform the user
            alert(data.message || "An error occurred. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error creating new account:", error);
        alert("An error occurred. Please try again.");
    });
}


