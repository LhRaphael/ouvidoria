export function seePassword(passId, confirmPassId){
    const passwordInput = document.getElementById(passId);
    const confirmPasswordInput = document.getElementById(confirmPassId);

    if(passwordInput.type === "password" && confirmPasswordInput.type === "password"){
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
    } else {
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
    }
}