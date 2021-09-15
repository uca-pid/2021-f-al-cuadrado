function isValidPassword(password, setInvalid){
    if(!passwordSyntax(password))setInvalid(true);
}

function passwordSyntax(password){
    const hasNumber = /\d/; 
    const hasLower = /[a-z]/;
    const hasUpper = /[A-Z]/;
    return (hasNumber.test(password)&&hasLower.test(password)&&hasUpper.test(password)&&(password.length>7))
}

export default isValidPassword;