import Main from "../../Main";
import LoginPage from "../../LoginPage";
import Content from "../../Content";

export const pages = {
    'main': "Главная",
    'login': 'Вход',
    'users': 'Список'
}

export const routes = [
    {
        path: "/main/",
        element: <Main/>
    },
    {
        path: "/login/",
        element: <LoginPage/>
    },
    {
        path: "/users/",
        auth: true,
        element: <Content/>
    },
];
