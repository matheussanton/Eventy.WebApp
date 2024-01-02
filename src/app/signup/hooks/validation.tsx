import { SignupFormType } from "../types/SignupFormType";

export const validate = (payload : SignupFormType, stateSetters : any) : boolean  => {

    var isNameValid = validateName(payload?.name, stateSetters);
    var isEmailValid = validateEmail(payload?.email, stateSetters);
    var isPasswordValid = validatePassowrd(payload?.password, stateSetters);
    var isPasswordConfirmValid = validatePasswordConfirm(payload?.password, payload?.passwordConfirm, stateSetters);

    if(!isEmailValid || !isPasswordValid || !isPasswordConfirmValid || !isNameValid){
      stateSetters.setShowError(true);
      return false;
    };

    return true;
  }

const validateName = (name : any, stateSetters : any) : boolean => {
    
    if(!name || name.length == 0) {
        stateSetters.setNameValidationMessage("Nome é obrigatório");
        return false;
    }
    
    stateSetters.setNameValidationMessage("");
    return true;
}

const validateEmail = (email : any, stateSetters : any) : boolean => {

    if(!email || email.length == 0) {
      stateSetters.setEmailValidationMessage("Email é obrigatório");
      return false;
    }
    
    if(!email.includes('@')) {
      stateSetters.setEmailValidationMessage("Email inválido");
      return false;
    }

    stateSetters.setEmailValidationMessage("");
    return true;
  }

  const validatePassowrd = (password : any, stateSetters : any) : boolean => {
    
    if(!password || password.length == 0) {
      stateSetters.setPasswordValidationMessage("Senha é obrigatória");
      return false;
    }

    stateSetters.setPasswordValidationMessage("");
    return true;
  }

  const validatePasswordConfirm = (password : any, passwordConfirm : any, stateSetters : any) : boolean => {
        
    if(!passwordConfirm || passwordConfirm.length == 0) {
        stateSetters.setPasswordConfirmValidationMessage("Confirmação de senha é obrigatória");
        return false;
    }
    
    if(passwordConfirm != password) {
        stateSetters.setPasswordConfirmValidationMessage("Confirmação de senha não confere");
        return false;
    }
    
    stateSetters.setPasswordConfirmValidationMessage("");
    return true;
}
