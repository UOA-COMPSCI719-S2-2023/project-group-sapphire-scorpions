document.addEventListener("DOMContentLoaded", () => {
  // This ensures that our JavaScript doesn't run until the HTML is fully loaded.

  const toggleButton = document.getElementById('toggleButton');
  const blogPostBody = document.querySelector('.blog-post-body');

  toggleButton.addEventListener('click', function () {
    // Toggle the "hidden" class on the blog-post-body div
    blogPostBody.classList.toggle('hidden');
  });

  const toggleButtonForMessages = document.getElementById('toggleButtonForMessages');
  const messageFunction = document.querySelector('.message-function');

  toggleButtonForMessages.addEventListener('click', function () {
    // Toggle the "hidden" class on the message-function div
    messageFunction.classList.toggle('hidden');
  });


// // Sample data to check for content
// const blogContent = [/* Your array of blog content */];

// // Check for content in blogContent
// const hasContent = blogContent.length > 0;

// // Get a reference to the blog post container
// const blogPostContainer = document.getElementById('blogPostContainer');

// // Conditionally set the display style based on the presence of content
// if (blogPostContainer) {
//     blogPostContainer.style.display = hasContent ? 'block' : 'none';
// }




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

  // Define an array to store the stage names
  const stageNames = ["(seed)", "(root)", "(sprout)", "(baby plant)", "(adult plant)", "(seeding)"];

// Function to update counters and check if they reach 1
function updateCounter(buttonId, counterId) {
    if (buttonId === 'water-button' && waterCounter < 1) {
      waterCounter++;
      document.getElementById(counterId).textContent = waterCounter;
    } else if (buttonId === 'sun-button' && sunCounter < 1) {
      sunCounter++;
      document.getElementById(counterId).textContent = sunCounter;
    } else if (buttonId === 'food-button' && foodCounter < 1) {
      foodCounter++;
      document.getElementById(counterId).textContent = foodCounter;
    }

  // Check if all counters reach 1
  if (waterCounter === 1 && sunCounter === 1 && foodCounter === 1) {
      waterCounter = 0;
      sunCounter = 0;
      foodCounter = 0;
      // Increment the lifeCycleCounter when all counters reach 3
      lifeCycleCounter++;

      // Update the life cycle counter in the HTML with the stage name
      document.getElementById('life-cycle-counter').textContent = `${lifeCycleCounter} ${stageNames[lifeCycleCounter]}`;

      // Update the h4 message based on the lifeCycleCounter
      if (lifeCycleCounter === 1) {
        document.querySelector("h4").textContent = "Congratulation, you completed stage one. Your sunflower has grown roots.Give water, sun, and nutrients to see your sunflower sprout.";
        document.querySelector("h4").style.color = "green";
        document.querySelector(".sunflower-stage-image").src = "./images/sf1b.png"; //Ana to change!!!!!!!!!!!!
      } else if (lifeCycleCounter === 2) {
        document.querySelector("h4").textContent = "Congratulation, you completed stage two. Your sunflower has sprouted.Give water, sun, and nutrients to see your sunflower grow into a baby sunflower.";
        document.querySelector("h4").style.color = "green";
        document.querySelector(".sunflower-stage-image").src = "./images/sf2b.png"; //Ana to change!!!!!!!!!!!!
      } else if (lifeCycleCounter === 3) {
        document.querySelector("h4").textContent = "Congratulation, you completed stage three. Your sunflower is a baby plant.Give water, sun, and nutrients to see your sunflower grow into a adult sunflower.";
        document.querySelector("h4").style.color = "green";
        document.querySelector(".sunflower-stage-image").src = "./images/sf3b.png"; //Ana to change!!!!!!!!!!!!
      } else if (lifeCycleCounter === 4) {
        document.querySelector("h4").textContent = "Congratulation, you completed stage four. Your sunflower is an adult plant. Give water, sun, and nutrients to see your sunflower seeding.";
        document.querySelector("h4").style.color = "green";
        document.querySelector(".sunflower-stage-image").src = "./images/sf4b.png"; //Ana to change!!!!!!!!!!!!
      } else {
        document.querySelector("h4").textContent = "Congratulation, completed the entire life cycle. Your sunflower's seeds have fallen. Restart Life Cycle if you want to play again.";
        document.querySelector("h4").style.color = "red";
        document.querySelector(".sunflower-stage-image").src = "./images/sf5b.png";
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
    document.querySelector("h4").textContent = "Instructions: You have a sunflower seed. Give water, sun, and nutrients to see your sunflower grow roots.";
    document.querySelector("h4").style.color = "black";
    document.querySelector(".sunflower-stage-image").src = "./images/sf0b.png";
  });

  //#####End Tamagotchi Code########


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

  // Add an event listener to handle image removal
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-image-button')) {
      const photoEntry = event.target.parentNode;
      const imageSrc = photoEntry.querySelector('img').src;

      // Make a fetch request to the server to delete the image and caption
      fetch("/removeImage", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageSrc })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Remove the photo entry from the DOM
            photoEntry.remove();
          } else {
            alert(data.message || "An error occurred while removing the image.");
          }
        })
        .catch(error => {
          console.error("Error removing the image:", error);
          alert("An error occurred. Please try again.");
        });
    }
  });

});
