import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Decks } from "../pages/Decks/Decks";
import { UserDecks } from "../pages/UserDecks/UserDecks";
import { DeckPage } from "../pages/DeckPage/DeckPage";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Decks/>}/>
                <Route path="decks" element={<Decks/>}/>
                <Route path="user_decks" element={<UserDecks/>}/>
                <Route path="user_decks/:id" element={<UserDecks/>}/>
                <Route path="deck" element={<DeckPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}