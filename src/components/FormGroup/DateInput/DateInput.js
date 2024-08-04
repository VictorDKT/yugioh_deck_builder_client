import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { validateInput } from "../../../tools/validateInputs";
import { formatDateToSendAlt } from "../../../tools/formatDateToSend";
import br from 'date-fns/locale/pt-BR';

import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";
import moment from "moment";
import { alertError } from "../../Alert/Alert";

registerLocale('pt-BR', br);

export function DateInput(props) {
    const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    useEffect(()=>{
        if(props.defaultValue) {
            const defaultDate = props.defaultValue;
            const date = new Date(parseInt(defaultDate.substr(0,4)), parseInt(defaultDate.substr(5,2))-1, parseInt(defaultDate.substr(8,2)) )
            setDate(date);
        }
    }, [props.defaultValue])

    useEffect(()=>{
        if(props.minDate) {
            const minDate = props.minDate;
            const date = new Date(parseInt(minDate.substr(0,4)), parseInt(minDate.substr(5,2))-1, parseInt(minDate.substr(8,2)) )
            setMinDate(date);
        }
    }, [props.minDate])

    useEffect(()=>{
        if(props.maxDate) {
            const maxDate = props.maxDate;
            const date = new Date(parseInt(maxDate.substr(0,4)), parseInt(maxDate.substr(5,2))-1, parseInt(maxDate.substr(8,2)) )
            setMaxDate(date);
        }
    }, [props.maxDate])

    return (
        <DatePicker
            className={`form-control-input ${props.errorMessage && "is-invalid-field"}`}
            selected={date}
            locale="pt-BR"
            dateFormat={props.dateFormat ? props.dateFormat : "dd/MM/yyyy"}
            disabled={props.disabled}
            minDate={minDate}
            maxDate={maxDate}
            showMonthYearPicker={props.monthPicker}
            onChange={(date)=>{
                if(date) {
                    if(minDate && date < minDate) {
                        alertError(`A data mínima é ${moment(minDate).format("DD/MM/YYYY")}`)
                    } else if(maxDate && date > maxDate) {
                        alertError(`A data máxima é ${moment(maxDate).format("DD/MM/YYYY")}`)
                    } else {
                    if(props.dateFormat) {
                        const dateString = moment(date).format(props.dateFormat)
                        setDate(date);
                        if(props.onChange) {
                            if(props.validations) {
                                const validationError = validateInput(dateString, props.validations);
                                if(props.setFieldValidation){
                                    props.setFieldValidation(props.id, validationError)
                                }
                            }
                            props.onChange(dateString);
                        }
                    } else {
                        const dateString = formatDateToSendAlt(date.getFullYear(), date.getMonth()+1, date.getDate(), "00:00:00")
                        setDate(date);
                        if(props.onChange) {
                            if(props.validations) {
                                const validationError = validateInput(dateString, props.validations);
                                if(props.setFieldValidation){
                                    props.setFieldValidation(props.id, validationError)
                                }
                            }
                            props.onChange(dateString);
                        }
                    }
                    }
                }
            }}
        />
    )
}