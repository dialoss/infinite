import React from 'react';
import { QueryClientProvider} from 'react-query'
import "./app.scss"
import "./types";
import Container from "./ui/Container";
import {Modal} from "./ui/Modal";
import {queryClient} from "src/api/client";
import Content from "src/pages/Content";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <Content></Content>
            </Container>
            <Modal></Modal>
        </QueryClientProvider>
    );
};

export default App;