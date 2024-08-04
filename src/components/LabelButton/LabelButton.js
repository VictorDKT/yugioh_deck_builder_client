import "./LabelButton.css";

export function LabelButton(props) {
    return (
        <button className={`label-button ${!props.isSecondary ? "label-button-primary" : "label-button-secondary"} ${props.extraClass}`} type={"button"} onClick={()=>{props.callback()}} disabled={props.disabled} >{props.label}</button>
    )
}