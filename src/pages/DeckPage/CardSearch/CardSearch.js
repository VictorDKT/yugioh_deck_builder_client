import { useState } from "react";
import "./CardSearch.css";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { alertError } from "../../../components/Alert/Alert";
import { addCardToDeck } from "../utils";

export function CardSearch(props) {
    const [name, setName] = useState("");

    return (
        <div className="card-search-container">
            {props.cardsLoading &&
                <div className="cards-loader">Carregando...</div>
            }
            <div className="card-search-header">
                <input 
                    className="card-search-input"
                    placeholder="Digite o nome da carta"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                />
                <button
                    className="card-search-button"
                    onClick={()=>{
                        props.searchCallback(name);
                    }}
                >
                    <FaSearch className="search-icon"/>
                </button>
            </div>
            <div className="search-cards-box">
                {props.cards.map(card=>{
                    return (
                        <div 
                            className="card-container-search"
                            onMouseEnter={()=>{
                                if(card) {props.setSelectedCard(card)}
                            }}
                            onClick={()=>{
                                const extraTypes = [
                                    "fusion_pendulum",
                                    "xyz_pendulum",
                                    "synchro_pendulum",
                                    "fusion",
                                    "xyz",
                                    "synchro",
                                    "link",
                                ];
                                const main = props.cardList.filter(card=>!extraTypes.includes(card.frameType));
                                const extra = props.cardList.filter(card=>extraTypes.includes(card.frameType));
                                let mainNumber = 0;
                                let extraNumber = 0;

                                main.forEach(card=>{mainNumber = mainNumber+card.quantity});
                                extra.forEach(card=>{extraNumber = extraNumber+card.quantity});

                                if(!extraTypes.includes(card.frameType)) {
                                    if(mainNumber >= 60) {
                                        alertError("Você não pode colocar mais de 60 cartas no main deck")
                                    } else {
                                        const { main, extra, cardList } = addCardToDeck(props.cardList, card);
                                        props.setDeck({main, extra});
                                        props.setCardList(cardList);
                                    }
                                } else {
                                    if(extraNumber >= 15) {
                                        alertError("Você não pode colocar mais de 15 cartas no extra deck")
                                    } else {
                                        const { main, extra, cardList } = addCardToDeck(props.cardList, card);
                                        props.setDeck({main, extra});
                                        props.setCardList(cardList);
                                    }
                                }
                            }}
                        >
                            <img className="card-image" src={"data:image/jpg;base64,"+card.img}/>
                        </div>
                    )
                })}
            </div>
            <div className="search-cards-pagination">
                {props.offset > 0 && 
                    <IoIosArrowBack 
                        className="pagination-arrow" 
                        onClick={()=>{
                            props.setOffset(props.offset-27);
                        }}
                    />
                }
                <div className="pagination-number">{(props.offset+27)/27}</div>
                {props.total > props.offset +27 && 
                    <IoIosArrowForward 
                        className="pagination-arrow"
                        onClick={()=>{
                            props.setOffset(props.offset+27);
                        }}
                    />
                }
            </div>
        </div>
    )
}