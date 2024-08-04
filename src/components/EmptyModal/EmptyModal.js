import { ReactNode } from "react";
import "./EmptyModal.css";

export function EmptyModal(props) {
    return (
        <div 
            className="empty-modal-blur"
            style={{
                display: props.showModal ? "flex" : "none",
            }}
        >
            <div className="empty-modal" style={{ width: props.customWidth && props.customWidth }}>
                <div className="empty-modal-header">
                    <div className="empty-modal-title">{props.titleLabel}</div>
                    <div className="empty-modal-close-icon" onClick={()=>{props.closeModal()}}>x</div>
                </div>
                <div className="empty-modal-body">
                    {props.body}
                </div>
                {props.footer && <div className="empty-modal-footer">
                    <div className="empty-modal-footer-buttons-container">
                        {props.footer}
                    </div>
                </div>}
            </div>
        </div>
    )
}