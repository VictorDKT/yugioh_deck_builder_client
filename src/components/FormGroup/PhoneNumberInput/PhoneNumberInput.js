import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { validateInput } from "../../../tools/validateInputs";

import "./PhoneNumberInput.css";

export function PhoneNumberInput(props) {
    const [phone, setPhone] = useState("");

    useEffect(()=>{
        if(props.defaultValue) {
            setPhone(props.defaultValue);
        }
    }, [props.defaultValue])

    return (
        <PhoneInput
            inputClass={`form_group_phone ${props.errorMessage && "is-invalid-field"}`}
            country={'br'}
            value={phone}
            disabled={props.disabled}
            onChange={(phone)=>{
                setPhone(phone);
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(phone, props.validations);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError)
                        }
                    }
                    props.onChange(phone);
                }
            }}
        />
    )
}