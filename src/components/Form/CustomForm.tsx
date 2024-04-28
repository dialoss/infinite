import React from 'react';
import {Form} from "@rjsf/mui";
import {Button} from "@mui/material";
import validator from '@rjsf/validator-ajv8';

const CustomForm = ({schema, submit, uiSchema={}}) => {
    return (
        <Form
            className={'p-2'}
            noHtml5Validate
            uiSchema={uiSchema}
            schema={schema}
            validator={validator}
            onSubmit={submit}>
            <div className={'w-100 flex justify-center'}><Button type={'submit'} variant={'contained'}>Сохранить</Button></div>
        </Form>
    );
};

export default CustomForm;