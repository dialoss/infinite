import React, {useMemo, useState} from 'react';
import List from "src/components/List/List";
import CustomForm from "src/components/Form/CustomForm";
import {config, editSchema} from "src/components/List/config";
import {getFormFields} from "src/components/Form/tools";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useMutation} from "react-query";
import {queryClient} from "src/api/client";
import {AvatarWidget} from "src/ui/AvatarWidget";
import {actions} from "src/store/app";
import {useDispatch, useSelector} from "react-redux";
import {produce} from "immer";

const uiSchema = {
    avatar: {
        "ui:widget": AvatarWidget
    }
};
let page = 0;

const Content = () => {
    const [selected, setSelected] = useState({});
    const update = useMutation({
        mutationFn: data => data,
        onSuccess: (user) => queryClient.setQueryData(['users'],
            groups => produce(groups, (data) => {
                let {pages} = data;
                pages[page] = pages[page].map(u => u.userId === user.userId ? user : u)
                data.pages = pages;
            })
        )
    })

    function onSelect(user, i) {
        page = i;
        setSelected(s => s && user.userId === s.userId ? {} : user);
    }

    const schema = useMemo(() => selected.userId && ({...editSchema, ...getFormFields("User", config, selected)}), [selected]);
    const [sz, setSz] = useState(1000);
    const dispatch = useDispatch();
    const fetchSize = useSelector(state => state.app.fetchSize);
    return (
        <Paper style={{display: 'flex', marginTop: 20, padding: 10}}>
            <div className={'w-1/2'}>
                <List key={fetchSize} onSelect={onSelect} selected={selected}></List>
                <div className={'flex flex-wrap items-center mt-2'}>
                    <TextField label={"Размер страницы"}
                               style={{marginTop: 10}}
                               size={'sm'}
                               onChange={e => {
                                   console.log(e)
                                   setSz(+e.target.value || 0)
                               }}
                               type={'number'}
                               value={sz > 0 ? sz : ''}></TextField>
                    <Button onClick={() => {
                        dispatch(actions.setSize(sz));
                        queryClient.removeQueries(['users'])
                    }}>Подтвердить</Button>
                </div>
            </div>
            {selected.userId && <div className={'w-1/2 p-1'}>
                <Typography>Пользователь {selected.userId}</Typography>
                <CustomForm key={selected.userId}
                            uiSchema={uiSchema} submit={d => {
                    update.mutate({...selected, ...d.formData});
                    setSelected({...selected, ...d.formData})
                }}
                            schema={schema}></CustomForm>
            </div>}
        </Paper>
    );
};

export default Content;