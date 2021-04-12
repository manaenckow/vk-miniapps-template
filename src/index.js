import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {AdaptivityProvider, AppRoot} from "@vkontakte/vkui";

const Structure = (
    <AdaptivityProvider>
        <AppRoot>
            <App/>
        </AppRoot>
    </AdaptivityProvider>
);

ReactDOM.render(Structure, document.getElementById("root"));
