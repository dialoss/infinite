import React from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {Button, Typography} from "@mui/material";
import {login} from "src/components/Login/api";
import {useAuth} from "src/store/auth";
import {schema} from "./config";

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
                    <Typography textAlign={'center'} variant={'h5'}>Вы авторизованы</Typography>
                    <Button className={'mx-auto'} variant={'contained'} onClick={() =>
                        useAuth.setState(state => ({
                            token: ""
                        }))}>Выйти</Button>
                </div> :
                <Form
                    schema={schema}
                    validator={validator}
                    onSubmit={submit}>
                    <Button type={'submit'} variant={'contained'}>подтвердить</Button>
                </Form>
            }
        </div>
    );
};

export default Login;