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
    

   //#####Tamagotchi Code########

   // Retrieve stored counters from local storage, or initialize to zero if not found
   let waterCounter = parseInt(localStorage.getItem('waterCounter')) || 0;
   let sunCounter = parseInt(localStorage.getItem('sunCounter')) || 0;
   let foodCounter = parseInt(localStorage.getItem('foodCounter')) || 0;
   let lifeCycleCounter = parseInt(localStorage.getItem('lifeCycleCounter')) || 0;
   console.log(lifeCycleCounter);
 
   // Define an array to store the stage names
   const stageNames = ["(seed)", "(root)", "(sprout)", "(baby plant)", "(adult plant)", "(seeding)"];
 
   // Function to update counters and check if they are equal to 3
   function updateCounter(buttonId, counterId) {
     if (buttonId === 'water-button' && waterCounter < 3) {
       waterCounter++;
       document.getElementById(counterId).textContent = waterCounter;
     } else if (buttonId === 'sun-button' && sunCounter < 3) {
       sunCounter++;
       document.getElementById(counterId).textContent = sunCounter;
     } else if (buttonId === 'food-button' && foodCounter < 3) {
       foodCounter++;
       document.getElementById(counterId).textContent = foodCounter;
     }
 
     // Check if all counters are equal to 3
     if (waterCounter === 3 && sunCounter === 3 && foodCounter === 3) {
       waterCounter = 0;
       sunCounter = 0;
       foodCounter = 0;
       // Increment the lifeCycleCounter when all counters reach 3
       lifeCycleCounter++;
 
       // Update the life cycle counter in the HTML with the stage name
       document.getElementById('life-cycle-counter').textContent = `${lifeCycleCounter} ${stageNames[lifeCycleCounter]}`;
 
       // Update the h2 message based on the lifeCycleCounter
       if (lifeCycleCounter === 0) {
           document.querySelector("h2").textContent = "You have a seed. Give water, sun, and nutrients to see your sunflower grow roots.";
         document.querySelector("h2").style.color = "green";
         document.querySelector(".sunflower-stage-image").src = "./images/sf0.JPG"; //Ana to change!!!!!!!!!!!!
       } else if (lifeCycleCounter === 1) {
         document.querySelector("h2").textContent = "Congratulation, you completed stage one. Your sunflower has grown roots.";
         document.querySelector("h2").style.color = "green";
         document.querySelector(".sunflower-stage-image").src = "./images/sf2.JPG"; //Ana to change!!!!!!!!!!!!
       } else if (lifeCycleCounter === 2) {
         document.querySelector("h2").textContent = "Congratulation, you completed stage two. Your sunflower has sprouted.";
         document.querySelector("h2").style.color = "green";
         document.querySelector(".sunflower-stage-image").src = "./images/sf3.JPG"; //Ana to change!!!!!!!!!!!!
       } else if (lifeCycleCounter === 3) {
         document.querySelector("h2").textContent = "Congratulation, you completed stage three. Your sunflower is a baby plant.";
         document.querySelector("h2").style.color = "green";
         document.querySelector(".sunflower-stage-image").src = "./images/sf4.JPG"; //Ana to change!!!!!!!!!!!!
       } else if (lifeCycleCounter === 4) {
         document.querySelector("h2").textContent = "Congratulation, you completed stage four. Your sunflower is an adult plant.";
         document.querySelector("h2").style.color = "green";
         document.querySelector(".sunflower-stage-image").src = "./images/sf4.JPG"; //Ana to change!!!!!!!!!!!!
       } else {
        document.querySelector("h2").textContent = "Congratulation, completed the entire life cycle. Your sunflower's seeds have fallen.";
        document.querySelector("h2").style.color = "red";
        document.querySelector(".sunflower-stage-image").src = "./images/sf5.JPG";
      }
     }
 
     // Update local storage
     localStorage.setItem('waterCounter', waterCounter);
     localStorage.setItem('sunCounter', sunCounter);
     localStorage.setItem('foodCounter', foodCounter);
     localStorage.setItem('lifeCycleCounter', lifeCycleCounter);
   }
 
   // Add event listeners to the life-needs-buttons
   document.getElementById('water-button').addEventListener('click', function () {
     if (lifeCycleCounter < 5) {
       updateCounter('water-button', 'water-counter');
     }
   });
 
   document.getElementById('sun-button').addEventListener('click', function () {
     if (lifeCycleCounter < 5) {
       updateCounter('sun-button', 'sun-counter');
     }
   });
 
   document.getElementById('food-button').addEventListener('click', function () {
     if (lifeCycleCounter < 5) {
       updateCounter('food-button', 'food-counter');
     }
   });
 
   // Add event listener to reset-button
   document.getElementById('reset-button').addEventListener('click', function () {
     if (lifeCycleCounter < 5) {
       waterCounter = 0;
       sunCounter = 0;
       foodCounter = 0;
 
       document.getElementById('water-counter').textContent = waterCounter;
       document.getElementById('sun-counter').textContent = sunCounter;
       document.getElementById('food-counter').textContent = foodCounter;
     }
   });
 
   // Add event listener to reset-life-cycle
   document.getElementById('reset-life-cycle').addEventListener('click', function () {
     waterCounter = 0;
     sunCounter = 0;
     foodCounter = 0;
     lifeCycleCounter = 0;
 
     document.getElementById('water-counter').textContent = waterCounter;
     document.getElementById('sun-counter').textContent = sunCounter;
     document.getElementById('food-counter').textContent = foodCounter;
     document.getElementById('life-cycle-counter').textContent = `${lifeCycleCounter} (seed)`;
 
     // Clear local storage
     localStorage.removeItem('waterCounter');
     localStorage.removeItem('sunCounter');
     localStorage.removeItem('foodCounter');
     localStorage.removeItem('lifeCycleCounter');
     document.querySelector("h2").textContent = "You have a seed. Give water, sun, and nutrients to see your sunflower grow roots";
     document.querySelector("h2").style.color = "black";
     document.querySelector(".sunflower-stage-image").src = "./images/sf0.JPG";
   });

   //#####End Tamagotchi Code########
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


