import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";
import {useAuth} from "../../../store/auth";
import {Typography} from "@mui/material";

function AuthorizedRoute({children}) {
    const auth = useAuth(state => state.token);
    if (!auth) return <div className={'flex justify-center items-center h-screen'}>
        <Typography variant={'h4'}>
            Нет доступа
        </Typography>
    </div>;
    return <>{children}</>
}


const AppRouter = () => {
    const navigate = useNavigate();
    window.app.navigate = (url: string) => navigate("/" + url);
    useLayoutEffect(() => {
        let page = window.location.pathname.split('/')[1];
        document.title = page.toUpperCase();
    }, [navigate])
    return (
        <Routes>
            {
                routes.map((route) =>
                    <Route element={route.auth ? <AuthorizedRoute>{route.element}</AuthorizedRoute> : route.element}
                           path={route.path}
                           key={route.path}/>
                )
            }
            <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
        </Routes>
    );
};

export default AppRouter;