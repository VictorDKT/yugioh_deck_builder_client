import { TopBar } from "./TopBar/TopBar";
import "./Layout.css";
import { Alert } from "../Alert/Alert";
import { ModalsProvider } from "./ModalsProvider";

export function Layout(props) {
    return (
        <div className="layout">
            <TopBar/>
            <Alert/>
            <ModalsProvider/>
            <div className="page-container">
                {props.children}
            </div>
        </div>
    )
}