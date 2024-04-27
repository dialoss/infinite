import React from 'react';
import {Typography} from "@mui/material";

const Text = ({children}) => {
    return (
        <Typography textAlign={'center'} variant={'h4'}>
            {children}
        </Typography>
    );
};

export default Text;