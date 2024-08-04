import { useState } from "react";
import FormGroup from "../../FormGroup/FormGroup";
import { EmptyModal } from "../../EmptyModal/EmptyModal";
import { LabelButton } from "../../LabelButton/LabelButton";
import { validateAllInputs } from "../../../tools/validateInputs";
import { alertError, alertSuccess } from "../../Alert/Alert";

import "./RegisterModal.css";
import { register } from "./requests";
import { closeRegisterModal, openLoginModal } from "../ModalsProvider";

export function RegisterModal(props) {
    const [errorMessages, setErrorMessages] = useState({});
    const [entity, setEntity] = useState({});
    const fieldsValidations = {
        login: ["mandatory"],
        password: ["password"],
    };

    return (
        <>
            <EmptyModal
                titleLabel={"Cadastre-se"}
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
                                label="Cancelar"  
                                extraClass="form-login-button" 
                                isSecondary={true} 
                                callback={()=>{
                                    props.closeModal();
                                }}
                            />
                            <LabelButton 
                                label="Cadastrar"
                                extraClass="form-login-button" 
                                callback={async ()=>{
                                    const validations = {...fieldsValidations};
                                    const validationResult = validateAllInputs({entity, validations});

                                    if(validationResult.success) {
                                        const response = await register(entity);

                                        if(response.success) {
                                            closeRegisterModal();
                                            openLoginModal();
                                            alertSuccess("Usuário registrado com sucesso. Realize o login.")
                                        } else {
                                            alertError("O login já está em uso.")
                                        }
                                        alertSuccess("Usuário criado com sucesso!")
                                    } else {
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