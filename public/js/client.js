window.addEventListener("load", function () {
  // THE FOLLOWING IS ABOUT LOGIN AND SIGNUPS

  const signupForm = document.querySelector('.sign-up form');
  const signupError = document.querySelector('.signup-error');
  const loginForm = document.querySelector('.login form');
  
  // Factor out common fetch logic into a function
  function performFetch(url, form, onSuccess) {
    const formData = new FormData(form);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.status === 200) {
        onSuccess();
      } else {
        return response.text().then(errorMessage => {
          if (form === signupForm) {
            signupError.innerText = errorMessage;
          } else {
            alert(errorMessage);
          }
        });
      }
    })
    .catch(error => {
      console.error(`There was an error with the ${url} request:`, error);
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      performFetch('/signup', signupForm, () => {
        window.location.href = '/login-signup';
      });
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      performFetch('/login', loginForm, () => {
        window.location.href = '/personal-blog';
      });
    });
  }

  //THESE ARE ABOUT THE PERSONAL BLOG SECTION AND WATERING YOUR PLANTS

  const editProfileButton = document.querySelector('.about-me-section button');
  if (editProfileButton) {
    editProfileButton.addEventListener('click', function() {
      window.location.href = '/edit-profile';
    });
  }

  // Assuming you might add this functionality later based on the commented out code
  // const editProfileImageButton = document.querySelector('.about-profile-body div img + a button');
  // if (editProfileImageButton) {...}

  // Generic placeholder function for plant care buttons
  function plantCarePlaceholder(alertMessage) {
    return function() {
      alert(`${alertMessage} (Backend integration coming soon)`);
    }
  }

  const waterButton = document.querySelector('.dont-kill-my-plant button:nth-child(2)');
  const sunButton = document.querySelector('.dont-kill-my-plant button:nth-child(3)');
  const changeSeedButton = document.querySelector('.dont-kill-my-plant button:nth-child(4)');

  if (waterButton) waterButton.addEventListener('click', plantCarePlaceholder('You watered the plant!'));
  if (sunButton) sunButton.addEventListener('click', plantCarePlaceholder('You gave light to the plant!'));
  if (changeSeedButton) changeSeedButton.addEventListener('click', plantCarePlaceholder('You changed the seed!'));
      
  //THE FOLLOWING ARE FUNCTIONS FOR THE DAILY QUIZ
  
  const nextButton = document.getElementById('nextBtn');
  if (nextButton) {
    nextButton.addEventListener('click', function () {
      window.location.href = '/daily-quiz-results';
    });
  }
});
