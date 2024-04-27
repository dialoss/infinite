import React from 'react';
import {Button, Typography} from "@mui/material";
import {login} from "src/components/Login/api";
import {useAuth} from "src/store/auth";
import {schema} from "./config";
import Text from "src/ui/Text";
import CustomForm from "src/components/Form/CustomForm";

const Login = ({callback}) => {
    const auth = useAuth(state => state.token);

    function submit(data) {
        login.loginCreate({
            authToken: data.formData
        }).then(r => {
            if (r.token) {
                useAuth.getState().setToken(r.token);
                callback();
            }
        });
    }

    return (
        <div>
            {auth ? <div className={'flex items-center gap-2 justify-center flex-col'}>
                    <Text>Вы авторизованы</Text>
                    <Button className={'mx-auto'} variant={'contained'} onClick={() =>
                        useAuth.setState(state => ({
                            token: ""
                        }))}>Выйти</Button>
                </div> :
                <CustomForm
                    schema={schema}
                    submit={submit}>
                </CustomForm>
            }
        </div>
    );
};

export default Login;