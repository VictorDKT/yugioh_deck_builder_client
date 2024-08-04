import { useEffect, useState } from "react";
import { getUserDecks } from "./requests";
import"./UserDecks.css";
import { GrFormView } from "react-icons/gr";

export function UserDecks() {
    const [decks, setDecks] = useState([]);

    useEffect(()=>{
        getUserDecks().then(response=>{
            setDecks(response.data);
        });
    }, [])

    return (
        <div className="decks-page">
            <div className="decks-page-content">
                <div className="decks-page-title">Meus Decks</div>
                <div className="decks-container">
                    {
                        decks.map(deck=>{
                            return (
                                <div className="deck-item">
                                    <div className="deck-data">
                                        <div className="deck-data-item">
                                            <div className="deck-data-text"><strong>Nome:</strong></div>
                                            <div className="deck-data-text">{deck.name}</div>
                                        </div>
                                        <div className="deck-data-item">
                                            <div className="deck-data-text"><strong>Autor:</strong></div>
                                            <div className="deck-data-text">{deck.login}</div>
                                        </div>
                                    </div>
                                    <div className="deck-view-box">
                                        <GrFormView
                                            onClick={()=>{
                                                window.location.pathname = `deck/${deck.id}`
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}