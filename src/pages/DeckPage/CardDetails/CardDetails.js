import { useState } from "react";
import "./CardDetails.css";


export function CardDetails(props) {
    const [name, setName] = useState("");

    return (
        <div className="card-details-container">
            {props.selectedCard &&
                <div className="details-card-image-box">
                    <div className="details-card-image-container">
                        <img
                            className="details-card-image"
                            src={"data:image/jpg;base64,"+props.selectedCard.img}
                        />
                    </div>
                    {!isNaN(props.selectedCard.atk) && <div className="atributes-box">{`Atk: ${props.selectedCard.atk} / ${!isNaN(props.selectedCard.def) ? `Def: ${props.selectedCard.def}` : ""}`}</div>}
                    <div className="description-box">
                        {props.selectedCard.desc}
                    </div>
                </div>
            }
        </div>
    )
}