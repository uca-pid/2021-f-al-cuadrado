function loginService(user, password, setInvalidCredentials) {
    if (user==="test@gmail.com" && password === "12345"){
        localStorage.setItem('session', JSON.stringify({code:"123456", user_id:1}));
        //window.location.href = "./home";
    }else{
        setInvalidCredentials('block')
    }
  }

export default loginService;