import {RJSFSchema} from "@rjsf/utils";
import defaultSchema from "src/components/Form/schema.json";
import {getFormFields, normalizeName} from "src/components/Form/tools";

export const config = {
    "isActive": {
        title: "Активен", default: true,
    },
    "firstName": {
        title: "Имя"
    },
    "lastName": {
        title: "Фамилия"
    },
    "password": {
        title: "Пароль",
    },
    "username": {
        title: "Логин",
    }
};

export const createSchema: RJSFSchema = {
    title: 'Создать пользователя',
    type: 'object',
    ...getFormFields("User", config)
};

export const editSchema: RJSFSchema = {
    title: 'Редактировать пользователя',
    type: 'object',
};


export const columns = [];
for (const rawName in defaultSchema.components.schemas.User.properties) {
    let name = normalizeName(rawName);
    const f = createSchema.properties[name] || {title: name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1)};
    columns.push({
        field: name,
        headerName: f.title,
        width: window.innerWidth < 1000 ? 150 : 100,
    })
}