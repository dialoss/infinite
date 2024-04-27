import React from 'react';
import User from "src/components/User/User";
import Text from "src/ui/Text";

const UserPage = () => {
    let path = window.location.pathname.split('/');
    let id = null;
    for (let i = 0; i < path.length; i++) {
        if (+path[i]) {
            id = +path[i];
            break;
        }
    }
    return (
        <div>
            {id ? <User key={id} id={id}></User> : <Text>Неверный ID</Text>}
        </div>
    );
};

export default UserPage;