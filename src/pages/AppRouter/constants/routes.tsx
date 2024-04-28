
import Content from "../../Content";

export const pages = {
    'main': "Главная",
    'login': 'Вход',
    'users': 'Список'
}

export const routes = [
    {
        path: "/users/",
        auth: true,
        element: <Content/>
    },
];
