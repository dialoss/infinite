import React from 'react';
import Login from "src/components/Login/Login";

const LoginPage = () => {
    return (
        <Login callback={() => window.app.navigate("users")}/>
    );
};

export default LoginPage;