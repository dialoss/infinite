import React from 'react';
import {Form} from "@rjsf/mui";
import {Button} from "@mui/material";
import validator from '@rjsf/validator-ajv8';

const CustomForm = ({schema, submit}) => {
    return (
        <Form
            className={'p-2'}
            noHtml5Validate
            schema={schema}
            validator={validator}
            onSubmit={submit}>
            <div className={'w-100 flex justify-center'}><Button type={'submit'} variant={'contained'}>подтвердить</Button></div>
        </Form>
    );
};

export default CustomForm;