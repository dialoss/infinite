import React, {useMemo, useState} from 'react';
import List, {fetchSize} from "src/components/List/List";
import CustomForm from "src/components/Form/CustomForm";
import {config, editSchema} from "src/components/List/config";
import {getFormFields} from "src/components/Form/tools";
import {Paper, Typography} from "@mui/material";
import {useMutation} from "react-query";
import {queryClient} from "src/api/client";
import {AvatarWidget} from "src/ui/AvatarWidget";

const uiSchema = {
    avatar: {
        "ui:widget": AvatarWidget
    }
};
let index = 0;

const Content = () => {
    const [selected, setSelected] = useState({});
    const update = useMutation({
        mutationFn: data => data,
        onSuccess: (user) => queryClient.setQueryData(['users'],
            groups => {
                let newGroups = structuredClone(groups)
                newGroups.pages[index] = newGroups.pages[index].map(u => u.userId === user.userId ? user : u);
                return newGroups;
            }
        )
    })

    function onSelect(user, i) {
        index = Math.floor(i / fetchSize);
        setSelected(s => s && user.userId === s.userId ? {} : user);
    }

    const schema = useMemo(() => selected.userId && ({...editSchema, ...getFormFields("User", config, selected)}), [selected]);

    return (
        <Paper style={{display: 'flex', marginTop: 20, padding: 10}}>
            <List onSelect={onSelect} selected={selected}></List>
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