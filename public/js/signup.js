const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup');
    const password = document.querySelector('#password-signup');
  
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
          headers: { 'Content-Type': 'application/json' },
      });
  
    if (response.ok) {
        console.log(response, "LOGGED IN____________________")
    document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  