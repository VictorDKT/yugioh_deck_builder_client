import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fillDeck, generateEmptyDeck, removeCardFromDeck, splitArrayIntoChunks } from "./utils";
import "./DeckPage.css";
import { CardSearch } from "./CardSearch/CardSearch";
import { editDeck, getDeck, saveDeck, searchCardsRequest } from "./requests";
import { CardDetails } from "./CardDetails/CardDetails";
import { alertError, alertSuccess } from "../../components/Alert/Alert";

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
    const [isEdit, setIsEdit] = useState(false);
    const [editAbled, setEditAbled] = useState(true);

    let { id } = useParams();

    useEffect(()=>{
        if(id) {
            setIsEdit(true);
            getDeck(id).then(response=>{
                const currentUser = localStorage.getItem("user")
                const deck = fillDeck(response.cards);
                if(currentUser && response.user_id === JSON.parse(currentUser).id) {
                    setEditAbled(true)
                } else {
                    setEditAbled(false)
                }
                setDeck(deck);
                setCardList(response.cards);
                setDeckName(response.name);
            })
        }
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
                            disabled={!editAbled}
                            defaultValue={deckName}
                            className="card-search-input"
                            placeholder="Digite o nome do deck"
                            onChange={(e)=>{
                                setDeckName(e.target.value);
                            }}
                        />
                        {editAbled && <button 
                            className="deck-save-button"
                            onClick={async ()=>{
                                const extraTypes = [
                                    "fusion_pendulum",
                                    "xyz_pendulum",
                                    "synchro_pendulum",
                                    "fusion",
                                    "xyz",
                                    "synchro",
                                    "link",
                                ];
                                const main = cardList.filter(card=>!extraTypes.includes(card.frameType));
                                let mainNumber = 0;

                                main.forEach(card=>{mainNumber = mainNumber+card.quantity});

                                if(mainNumber >= 40) {
                                    if(deckName.length > 0) {
                                        const user = localStorage.getItem("user");

                                        if(user) {
                                            const response = isEdit ? await editDeck(id, deckName, cardList) : await saveDeck(deckName, cardList);

                                            if(response.success) {
                                                alertSuccess(isEdit ? "Deck editado com sucesso!" : "Deck criado com sucesso!");
                                                setTimeout(()=>{
                                                    window.location.pathname = "user_decks"
                                                }, 500)
                                            }
                                        } else {
                                            alertError("Faça login para continuar");
                                        }
                                    } else {
                                        alertError("Insira o nome do deck");
                                    }
                                } else {
                                    alertError("Insira ao menos 40 cartas no main deck");
                                }
                            }}
                        >
                            Salvar
                        </button>}
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
                                                        if(editAbled) {
                                                            const result = removeCardFromDeck(cardList, card);
                                                            setDeck({main: result.main, extra: result.extra});
                                                            setCardList(result.cardList);
                                                        }
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
                                                if(editAbled) {
                                                    const result = removeCardFromDeck(cardList, card);
                                                    setDeck({main: result.main, extra: result.extra});
                                                    setCardList(result.cardList);
                                                }
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
                    editAbled={editAbled}
                />
            </div>
        </div>
    )
}