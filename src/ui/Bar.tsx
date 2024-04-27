import React, {useLayoutEffect} from "react";
import Container from '@mui/material/Container';
import {Stack, Tab, Tabs} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import {pages} from "src/pages/AppRouter/constants/routes";
import { useLocation } from 'react-router-dom';

function Bar({tabs}) {
    const location = useLocation();
    const [tab, setTab] = React.useState(0);
    useLayoutEffect(() => {
        setTab(Object.keys(pages).indexOf(window.location.pathname.replace('/', '')));
    }, [location])
    let tabsNames = Object.values(tabs);
    return (
        <AppBar position="fixed" sx={{zIndex: 3, paddingRight: "0 !important"}}>
            <Container className={'app-bar'} maxWidth="xl" sx={{paddingRight: '5px !important'}}>
                <Stack direction={'row'}>
                    <Tabs value={tab}
                          variant={'scrollable'}
                          indicatorColor="secondary"
                          textColor="inherit"
                    >
                        {
                            tabsNames.map((t, i) => <Tab onClick={() => {
                                window.app.navigate(Object.keys(pages)[i])
                                setTab(i);
                            }} key={t} label={t}></Tab>)
                        }
                    </Tabs>
                </Stack>
            </Container>
        </AppBar>

    );
}

export default Bar;
