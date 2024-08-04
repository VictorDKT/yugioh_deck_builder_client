import { validateInput } from "../../tools/validateInputs";
import { PhoneNumberInput } from "./PhoneNumberInput/PhoneNumberInput";
import Select from 'react-select';
import { DateInput } from "./DateInput/DateInput";

import "./FormGroup.css";
import { useEffect } from "react";

function FormGroup(props) {
    return (
        <div className={`size-${props.size} ${props.inputContainerExtraClass ? `${props.inputContainerExtraClass}` : ""}`}>
            <label className="input-label">{props.label}</label>
            {_generateInput(props)}
            <div className="is-invalid-label">{props.errorMessage}</div>
        </div>
    )
}

function _generateInput(props) {
    let input;

    switch(props.type) {
        case 'text':
            input = _generateTextInput(props);
            break;
        case 'password':
            input = _generateTextInput(props);
            break;
        case 'number':
            input = _generateTextInput(props);
            break;
        case 'image':
            input = _generateImageInput(props);
            break;
        case 'select':
            input = _generateSelectInput(props);
            break;
        case 'phone_number':
            input = _generatePhoneInput(props);
            break;
        case 'multiSelect':
            input = _generateMultiSelectInput(props);
            break;
        case 'date':
            input = _generateDateInput(props);
            break;
        default:
            break;
    }

    return input;
}

function _generateMultiSelectInput(props) {
    return (
        <Select
            options={props.options}
            isDisabled={props.disabled}
            isMulti={true}
            id={props.id}
            placeholder={props.placeholder}
            styles={{
                valueContainer: styles => ({
                    alignItems: "center",
                    display: "flex",
                    padding: "0px 7px",
                    width: "100%",
                    flexWrap: "wrap",
                }),
                multiValue: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                
                option: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                input: styles =>({
                    ...styles,
                    fontSize: "15px",
                    caretColor: "transparent"
                }),
                placeholder: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                noOptionsMessage: styles =>({
                    ...styles,
                    fontSize: "15px",
                }),
                control: (styles, {isDisabled}) => ({ 
                    display:"flex",
                    borderRadius: "10px",
                    border: "1px solid rgb(202,202,202)",
                    marginTop: "4px",
                    backgroundColor: isDisabled && "#efefef",
                    color: isDisabled && "rgb(170, 170, 170)",
                    opacity: isDisabled && "1",
                }),
            }}
            defaultValue={props.defaultValue}
            onChange={(selectedOptionsValues)=>{
                const selectedOptions = selectedOptionsValues
                if(props.onChange) {
                    const value = selectedOptions.map(option=>{
                        return option.value
                    })
                    if(props.validations) {
                        const validationError = validateInput(value, props.validations, props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError)
                        }
                    }
                    props.onChange(value);
                }
            }}
        />
    )
}

function _generatePhoneInput(props) {
    return (
        <PhoneNumberInput
            disabled={props.disabled}
            id={props.id}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            validations={props.validations}
            setFieldValidation={props.setFieldValidation}
            errorMessage={props.errorMessage}
        />
    )
}

function _generateDateInput(props) {
    return (
        <DateInput
            id={props.id}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            validations={props.validations}
            setFieldValidation={props.setFieldValidation}
            errorMessage={props.errorMessage}
            dateFormat={props.dateFormat}
            monthPicker={props.monthPicker}
            minDate={props.minDate}
            maxDate={props.maxDate}
        />
    )
}

function _generateTextInput(props) {
    return (
        <input 
            className={`form-control-input ${props.errorMessage && "is-invalid-field"} ${props.inputExtraClass ? `${props.inputExtraClass}` : ""}`}
            onChange={(event)=>{
                if(props.onChange) {
                    const value = event.target.value;

                    if(props.validations) {
                        const validationError = validateInput(value, props.validations, props.matchValue);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError)
                        }
                    }
                    props.onChange(value);
                }
            }} 
            defaultValue={props.defaultValue} 
            id={props.id} 
            disabled={props.disabled}
            placeholder={props.placeholder} 
            type={props.type}
        />
    )
}

function _generateImageInput(props) {
    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = (arr[0].match(/:(.*?);/))[1];
        const bstr = atob(arr[arr.length - 1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    useEffect(()=>{
        if(props.defaultValue && props.id) {
            const fileExtension = (props.defaultValue).split(";base64,")[0].split("/")[1];
            const file = dataURLtoFile(props.defaultValue, `image.${fileExtension}`);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
    
            const element = document.getElementById(props.id);
     
            if(element) {
                element.files = dataTransfer.files;
            }
        }
    }, [])

    return (
        <input 
            className={`form-control-input ${props.errorMessage && "is-invalid-field"} ${props.inputExtraClass ? `${props.inputExtraClass}` : ""}`}
            onChange={()=>{
                if(props.onChange) {
                    const file = (document.getElementById(props.id).files)[0];
                    const reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        const base64 = reader.result;
                        if(props.validations) {
                            const validationError = validateInput(base64, props.validations, props.matchValue);
                            if(props.setFieldValidation){
                                props.setFieldValidation(props.id, validationError)
                            }
                        }
                        props.onChange && props.onChange(base64);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                }
            }}
            id={props.id} 
            disabled={props.disabled}
            placeholder={props.placeholder} 
            type={props.type === "image" ? "file" :  props.type}
            accept=".png,.jpg"
        />
    )
}

function _generateSelectInput(props) {
    return (
        <select
            disabled={props.disabled}
            placeholder={props.placeholder}
            className={`form-control-input ${props.errorMessage && "is-invalid-field"} ${props.inputContainerExtraClass ? `${props.inputContainerExtraClass}` : ""}`}
            defaultValue={props.defaultValue}
            onChange={(event)=>{
                if(props.onChange) {
                    if(props.validations) {
                        const validationError = validateInput(event.target.value, props.validations);
                        if(props.setFieldValidation){
                            props.setFieldValidation(props.id, validationError)
                        }
                    }
                    props.onChange(event.target.value);
                }
            }} 
            id={props.id} 
        >
            <option value={""} disabled hidden>{props.placeholder}</option>
            {
                props.options && props.options.map((option)=>{
                    return (
                        <option value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}

export default FormGroup;