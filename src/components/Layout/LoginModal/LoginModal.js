import { useState } from "react";
import FormGroup from "../../FormGroup/FormGroup";
import { EmptyModal } from "../../EmptyModal/EmptyModal";
import { LabelButton } from "../../LabelButton/LabelButton";
import { validateAllInputs } from "../../../tools/validateInputs";
import { alertError, alertSuccess } from "../../Alert/Alert";

import "./LoginModal.css";
import { login } from "./requests";

export function LoginModal(props) {
    const [errorMessages, setErrorMessages] = useState({});
    const [entity, setEntity] = useState({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["password"],
    };

    return (
        <>
            <EmptyModal
                titleLabel={"Login"}
                showModal={props.showModal}
                closeModal={props.closeModal}
                customWidth="400px"
                body={
                    <div>
                        <FormGroup 
                            id="login" 
                            type="text" 
                            size="100" 
                            placeholder="Login" 
                            validations={fieldsValidations.login}
                            onChange={(value)=>{
                                const newEntity = {...entity}
                                newEntity["login"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field, value)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.login ? errorMessages.login : ""}
                        />
                        <FormGroup 
                            id="password" 
                            type="password" 
                            size="100"
                            placeholder="Senha" 
                            validations={fieldsValidations.password}
                            onChange={(value)=>{
                                const newEntity = {...entity}
                                newEntity["password"] = value;
                                setEntity(newEntity)
                            }}
                            setFieldValidation={(field, value)=>{
                                const newValidation = {...errorMessages};
                                newValidation[field] = value;
                                setErrorMessages(newValidation);
                            }}
                            errorMessage={errorMessages && errorMessages.password ? errorMessages.password : ""}
                        />
                        <div style={{marginTop: "20px", display: "flex"}}>
                            <LabelButton 
                                label="Cadastre-se"  
                                extraClass="form-login-button" 
                                isSecondary={true} 
                                callback={()=>{
                                    props.openRegisterModal();
                                    props.closeModal();
                                }}
                            />
                            <LabelButton
                                label="Entrar"  
                                extraClass="form-login-button" 
                                callback={async ()=>{
                                    const validations = {...fieldsValidations};
                                    const validationResult = validateAllInputs({entity, validations});
                                    const errors = {
                                        "User not exists": "O usuário não existe",
                                        "Invalid password": "Senha incorreta",
                                    }

                                    if(validationResult.success) {
                                        const response = await login(entity);

                                        if(response.success) {
                                            localStorage.setItem("token", `Bearer ${response.data.token}`);
                                            localStorage.setItem("user", JSON.stringify(response.data));
                                            alertSuccess("Login efetuado com sucesso!");

                                            //setTimeout(()=>{window.location.reload()}, 500);
                                        } else {
                                            alertError(errors[response.data]);
                                        }
                                    } else {
                                        const newErrorMessages = {...errorMessages};

                                        Object.keys(validationResult.errors).forEach(key=>{
                                            newErrorMessages[key] = validationResult.errors[key];
                                        })

                                        setErrorMessages(newErrorMessages)
                                        alertError("Um ou mais campos não estão corretamente preenchidos.")
                                    }
                                }}
                            />
                        </div>
                    </div>
                }
            />
        </>
    )
}