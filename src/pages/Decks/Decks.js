import { useEffect, useState } from "react";
import { getDecks } from "./requests";
import"./Decks.css";
import { Pagination } from "../../components/Pagination/Pagination";
import { GrFormView } from "react-icons/gr";

export function Decks() {
    const [decks, setDecks] = useState([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(()=>{
        getDecks(offset, limit).then(response=>{
            setDecks(response.data);
            setTotal(response.total);
        });
    }, [offset])

    return (
        <div className="decks-page">
            <div className="decks-page-content">
                <div className="decks-page-title">Decks</div>
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
                <div>
                    <Pagination total={total} offset={offset} setOffset={setOffset} />
                </div>
            </div>
        </div>
    )
}