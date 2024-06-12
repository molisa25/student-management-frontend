import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {UserContextProvider} from "./context/UserContext";
import {ModalContextProvider} from "./context/ModalContext";

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <ModalContextProvider>
                <UserContextProvider>
                    <Routes/>
                </UserContextProvider>
            </ModalContextProvider>
        </BrowserRouter>
    );
};
