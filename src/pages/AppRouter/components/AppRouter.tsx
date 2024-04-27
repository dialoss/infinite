import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";
import {useAuth} from "src/store/auth";
import Text from "src/ui/Text";
import {AnimatePresence, motion} from "framer-motion";

function AuthorizedRoute({children}) {
    const auth = useAuth(state => state.token);
    if (!auth) return <div className={'flex justify-center items-center h-screen'}>
        <Text>
            Нет доступа
        </Text>
    </div>;
    return <>{children}</>
}

export const routeVariants = {
    initial: {
        opacity: 0
    },
    final: {
        opacity: 1
    }
}

function RouteElement({route}) {
    return (
        <motion.div initial="initial"
                    transition={{
                        ease: "easeIn",
                        duration: 0.5,
                    }}
                    animate="final"
                    variants={routeVariants}>{
            route.auth ? <AuthorizedRoute>{route.element}</AuthorizedRoute> : route.element
        }</motion.div>
    );
}

const AppRouter = () => {
    const navigate = useNavigate();
    window.app.navigate = (url: string) => navigate("/" + url);
    useLayoutEffect(() => {
        let page = window.location.pathname.split('/')[1];
        document.title = page.toUpperCase();
    }, [navigate])
    return (
        <AnimatePresence>
            <Routes>
                {
                    routes.map((route) =>
                        <Route element={<RouteElement key={route.path} route={route}></RouteElement>}
                               path={route.path}
                               key={route.path}/>
                    )
                }
                <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;