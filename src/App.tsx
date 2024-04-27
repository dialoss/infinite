import React from 'react';
import { QueryClientProvider} from 'react-query'
import "./app.scss"
import "./types";
import Container from "./ui/Container";
import Alerts from "./components/Alerts";
import {Modal} from "./ui/Modal";
import {AppRouter} from "./pages/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {queryClient} from "src/api/client";
import Bar from "src/ui/Bar";
import {pages} from "src/pages/AppRouter/constants/routes";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <BrowserRouter>
                    <Bar tabs={pages}></Bar>
                    <div className="h-[60px]"></div>
                    <AppRouter></AppRouter>
                </BrowserRouter>
            </Container>
            <Alerts></Alerts>
            <Modal></Modal>
        </QueryClientProvider>
    );
};

export default App;