export function validateAllInputs(props) {
    const validationResult = {
        success: true,
        errors: {}
    }
    Object.keys(props.validations).forEach(key=>{
        props.validations[key].forEach(validation=>{
            if(validation === "mandatory") {
                if(!validateMandatory(props.entity[key])) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Campo obrigatório";
                }
            } else if(validation === "password") {
                if(!validatePassword(props.entity[key])) {
                    validationResult.success = false;
                    validationResult.errors[key] = "A senha deve ter ao menos 8 digitos";
                }
            } else if(validation === "matchValue") {
                if(!validateRetypePassword(props.entity[key], props.matchValue)) {
                    validationResult.success = false;
                    validationResult.errors[key] = "As Senhas não coincidem";
                }
            } else if(validation === "mandatoryArray") {
                if(!validateMandatoryArray(props.entity[key])) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Selecione ao menos uma opção";
                }
            } else if(validation === "email") {
                if(!validateMandatoryArray(props.entity[key])) {
                    validationResult.success = false;
                    validationResult.errors[key] = "Insira um email válido";
                }
            }
        })
    })
    return validationResult;
}

export function validateInput(field, validations, matchValue) {
    let error = "";
    validations.forEach(validation=>{
        if(validation === "mandatory") {
            if(!validateMandatory(field)) {
                error = "Campo obrigatório";
            }
        } else if(validation === "password") {
            if(!validatePassword(field)) {
                error = "A senha deve ter ao menos 8 digitos";
            }
        } else if(validation === "matchValue") {
            if(!validateRetypePassword(field, matchValue)) {
                error = "As Senhas não coincidem";
            }
        } else if(validation === "mandatoryArray") {
            if(!validateMandatoryArray(field)) {
                error = "Selecione ao menos uma opção";
            }
        } else if(validation === "email") {
            if(!validateEmail(field)) {
                error = "Insira um email válido";
            }
        }
    })
    return error.length > 0 ? error : null;
}

export function validateMandatory(field) {
    if(!field || field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

export function validatePassword(field) {
    if(!field || field.length < 8) {
        return false;
    } else {
        return true;
    }
}

export function validateRetypePassword(field, matchValue) {
    if(!field || field !== matchValue) {
        return false;
    } else {
        return true;
    }
}

export function validateMandatoryArray(field) {
    if(!field || field.length < 1) {
        return false;
    } else {
        return true;
    }
}

export function validateEmail(field) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(field);
}