import { useEffect, useState } from "react";
import { getDecks } from "./requests";
import"./Decks.css";
import { Pagination } from "../../components/Pagination/Pagination";
import { GrFormView } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";

export function Decks() {
    const [decks, setDecks] = useState([]);
    const [total, setTotal] = useState(1);
    const [offset, setOffset] = useState(0);
    const [nameFilter, setNameFilter] = useState("");
    const [name, setName] = useState("");
    const limit = 10;

    useEffect(()=>{
        getDecks(name, offset, limit).then(response=>{
            setDecks(response.data);
            setTotal(response.total);
        });
    }, [offset, name])

    return (
        <div className="decks-page">
            <div className="decks-page-content">
                <div style={{display: "flex"}}>
                    <div className="decks-page-title">Decks</div>
                    <div style={{display: "flex", padding: "10px"}}>
                        <input 
                            className="card-search-input deck-search-input"
                            placeholder="Digite o nome do deck"
                            onChange={(e)=>{
                                setNameFilter(e.target.value);
                            }}
                        />
                        <button
                            className="card-search-button"
                            onClick={()=>{
                                setName(nameFilter);
                            }}
                        >
                            <FaSearch className="search-icon"/>
                        </button>
                    </div>
                </div>
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