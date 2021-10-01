function loginService(user, password, setInvalidCredentials) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user, password: password })
    };
    fetch('https://smart-money-back.herokuapp.com/login/', requestOptions)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('session', JSON.stringify(data));
        window.location.href = "./home";
      })
      .catch(err => setInvalidCredentials('block'));
  }

export default loginService;