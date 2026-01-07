export function seePassword(passId){
    const passwordInput = document.getElementById(passId);

    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}