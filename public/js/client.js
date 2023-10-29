window.addEventListener("load", function () {


  document.addEventListener('DOMContentLoaded', function () {

    // THE FOLLOWING IS ABOUT LOGIN AND SIGNUPS

    // Capture the sign up form submission
    const signupForm = document.querySelector('.sign-up form');
    const signupError = document.querySelector('.signup-error');
    
    if (signupForm) {
      signupForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission behavior
  
        const formData = new FormData(signupForm);
  
        fetch('/signup', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (response.status === 200) {
              // Successful signup, redirect to login-signup
              window.location.href = '/login-signup';
            } else {
              // Extract error message from the response and show in the signup-error paragraph
              return response.text().then(errorMessage => {
                signupError.innerText = errorMessage;
              });
            }
          })
          .catch(error => {
            console.error('There was an error with the signup:', error);
          });
      });
    }

    // Capture the login form submission
    const loginForm = document.querySelector('.login form');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the default form submission behavior
  
        const formData = new FormData(loginForm);
  
        fetch('/login', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (response.status === 200) {
              // Successful login, redirect to personal-blog
              window.location.href = '/personal-blog';
            } else {
              // Extract error message from the response and alert the user
              return response.text().then(errorMessage => {
                alert(errorMessage);
              });
            }
          })
          .catch(error => {
            console.error('There was an error with the login:', error);
          });
      });
    }

  //THESE ARE ABOUT THE PERSONAL BLOG SECTION AND WATERING YOUR PLANTS

    // Handle the edit profile button click
    const editProfileButton = document.querySelector('.about-me-section button');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            // Here you can add any custom logic before redirecting, like an AJAX request, a confirmation modal, etc.
            window.location.href = '/edit-profile';
        });
    }

    // Handle the edit profile image button click
    const editProfileImageButton = document.querySelector('.about-profile-body div img + a button');
    if (editProfileImageButton) {
        editProfileImageButton.addEventListener('click', function() {
            // Again, add any custom logic before redirecting
            window.location.href = '/edit-profile-image';
        });
    }

    // Functionality for 'water' button
    const waterButton = document.querySelector('.dont-kill-my-plant button:nth-child(2)');
    if (waterButton) {
      waterButton.addEventListener('click', function () {
        alert('You watered the plant!');
      });
    }

    // Functionality for 'sun' button
    const sunButton = document.querySelector('.dont-kill-my-plant button:nth-child(3)');
    if (sunButton) {
      sunButton.addEventListener('click', function () {
        alert('You gave the plant sunlight!');
      });
    }

    // Functionality for 'change seed' button
    const changeSeedButton = document.querySelector('.dont-kill-my-plant button:nth-child(4)');
    if (changeSeedButton) {
      changeSeedButton.addEventListener('click', function () {
        alert('You changed the seed!');
      });
    }
  });

      
  //THE FOLLOWING ARE FUNTIONS FOR THE DAILY QUIZ
  
  // The 'Next' button in daily-quiz.handelbars once clicked, will go to daily-quiz-results.handlebars
    const nextButton = document.getElementById('nextBtn');
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        window.location.href = '/daily-quiz-results';
      });
    }
  });