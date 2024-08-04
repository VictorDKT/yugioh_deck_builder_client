import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateEmptyDeck, removeCardFromDeck, splitArrayIntoChunks } from "./utils";
import "./DeckPage.css";
import { CardSearch } from "./CardSearch/CardSearch";
import { searchCardsRequest } from "./requests";
import { CardDetails } from "./CardDetails/CardDetails";

export function DeckPage() {
    const [cardList, setCardList] = useState([]);
    const [deck, setDeck] = useState(generateEmptyDeck());
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(27);
    const [name, setName] = useState("");
    const [searchCards, setSearchCards] = useState([]);
    const [total, setTotal] = useState(0);
    const [cardsLoading, setCardsLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState();
    const [deckName, setDeckName] = useState("");


    let { id } = useParams();

    useEffect(()=>{
        //
    }, [id])

    useEffect(()=>{
        setCardsLoading(true);
        searchCardsRequest(name, offset, limit).then(response=>{
            setTotal(response.total);
            setSearchCards(response.data.cards);
            setCardsLoading(false);
        })
    }, [offset, limit, name])

    return (
        <div className="deck-page-container">
            <div className="side-container">
                <div className="card-details">
                    <div className="deck-name-container">
                        <input 
                            className="card-search-input"
                            placeholder="Digite o nome do deck"
                            onChange={(e)=>{
                                setDeckName(e.target.value);
                            }}
                        />
                        <button 
                            className="deck-save-button"
                        >
                            Salvar
                        </button>
                    </div>
                    <CardDetails selectedCard={selectedCard} />
                </div>
                <div className="deck-label-container">
                    <div className="main-label">
                        <div className="deck-label">Main</div>
                    </div>
                    <div className="extra-label">
                        <div className="deck-label">Extra</div>
                    </div>
                </div>
            </div>
            <div className="deck-container">
                    <div className="main-deck-container">
                        {splitArrayIntoChunks(deck.main).map(line=>{
                            return (
                                <div className="card-line">
                                    {line.map(card=>{
                                        return (
                                            <div className="card-box">
                                                {card && <img 
                                                    onClick={()=>{
                                                        const result = removeCardFromDeck(cardList, card);
                                                        setDeck({main: result.main, extra: result.extra});
                                                        setCardList(result.cardList);
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        position: "absolute"
                                                    }}
                                                    src={"data:image/jpg;base64,"+card.img}
                                                />}
                                            </div>
                                        )   
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className="extra-deck-container">
                        {deck.extra.map(card=>{
                            return (
                                <div className="extra-deck-slot">
                                    <div className="extra-deck-card-box">
                                        {card && <img 
                                            onClick={()=>{
                                                const result = removeCardFromDeck(cardList, card);
                                                setDeck({main: result.main, extra: result.extra});
                                                setCardList(result.cardList);
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                position: "absolute"
                                            }}
                                            src={"data:image/jpg;base64,"+card.img}
                                        />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
            <div className="side-container">
                <CardSearch 
                    cards={searchCards} 
                    searchCallback={(value)=>{setName(value)}} 
                    offset={offset} setOffset={setOffset} 
                    total={total} 
                    cardsLoading={cardsLoading}
                    cardList={cardList}
                    setCardList={setCardList}
                    setDeck={setDeck}
                    deck={deck}
                    setSelectedCard={setSelectedCard}
                />
            </div>
        </div>
    )
}