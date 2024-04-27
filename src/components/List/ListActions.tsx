import {Button, Stack} from "@mui/material";
import {useMutation, useQueryClient} from "react-query";
import {client} from "./api";
import {config, createSchema, editSchema} from "src/components/List/config";
import CustomForm from "src/components/Form/CustomForm";
import {getFormFields} from "src/components/Form/tools";
import {getSelectedUsers} from "src/components/List/tools";


export function ListActions({listRef}) {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: user => client.usersCreate({user}),
        onSuccess: (user) => queryClient.setQueryData(['users'], users => [...users, user])
    });
    const update = useMutation({
        mutationFn: data => client.usersUpdate(data),
        onSuccess: (user) => queryClient.setQueryData(['users'], users => users.map(u => u.id === user.id ? user : u))
    })
    const remove = useMutation({
        mutationFn: id => {
            client.usersDestroy({id});
            return id;
        },
        onSuccess: (id) => queryClient.setQueryData(['users'], users => users.filter(u => u.id !== id))
    })

    const actions = [
        {
            name: 'Создать',
            callback: () => {
                window.app.openModal({
                    content:
                        <CustomForm
                            schema={createSchema}
                            submit={d => {
                                window.app.closeModal();
                                create.mutate(d.formData);
                            }}></CustomForm>
                })
            }
        },
        {
            name: 'Удалить',
            callback: () => {
                let users = getSelectedUsers(listRef);
                if (!users.length) {
                    window.app.alert({message: "Не выбраны пользователи", type: 'error'});
                    return;
                }
                for (const user of users) {
                    remove.mutate(user.id);
                }
            }
        },

        {
            name: 'Редактировать',
            callback: () => {
                let user = getSelectedUsers(listRef).slice(-1)[0];
                if (!user) {
                    window.app.alert({message: "Пользователь не выбран", type: 'error'});
                    return
                }
                window.app.openModal({
                    content:
                        <CustomForm schema={{...editSchema, ...getFormFields("PatchedUser", config, user)}}
                                    submit={d => {
                                        window.app.closeModal();
                                        update.mutate({id: user.id, user: d.formData});
                                    }}></CustomForm>
                })
            }
        },
    ];
    return (
        <Stack flexWrap={'wrap'} flexDirection={'row'} gap={2} justifyContent={'center'}>{
            actions.map(action =>
                <Button key={action.name} variant={'contained'} onClick={action.callback}>
                    {action.name}
                </Button>
            )
        }</Stack>
    )
}