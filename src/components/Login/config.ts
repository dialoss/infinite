import {RJSFSchema} from "@rjsf/utils";
import {getFormFields} from "src/ui/tools";

export const schema: RJSFSchema = {
    title: 'Авторизация',
    type: 'object',
    ...getFormFields("AuthToken", {
        username: {
            title: 'Логин', default: "test_super"
        },
        password: {
                title: 'Пароль', default: "Nf<U4f<rDbtDxAPn"
        }
    })
};