import {Button, Stack} from "@mui/material";
import {Form} from "@rjsf/mui";
import {getFormFields} from "src/ui/tools";
import {useMutation, useQueryClient} from "react-query";
import {client} from "./api";
import validator from '@rjsf/validator-ajv8';
import {config, createSchema, editSchema} from "src/components/List/config";


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
            name: 'Удалить',
            callback: () => {
                for (const user of listRef.current.getSelectedRows().values()) {
                    remove.mutate(user.id);
                }
            }
        },
        {
            name: 'Редактировать',
            callback: () => {
                let user = [...listRef.current.getSelectedRows().values()].slice(-1)[0];
                if (!user) {
                    window.app.alert({message: "Пользователь не выбран", type: 'error'});
                    return
                }
                window.app.openModal({
                    content:
                        <Form
                            schema={{...editSchema, ...getFormFields("PatchedUser", config, user)}}
                            validator={validator}
                            onSubmit={d => {
                                window.app.closeModal();
                                update.mutate({id: user.id, user: d.formData});
                            }}
                        > <Button type={'submit'} variant={'contained'}>подтвердить</Button>
                        </Form>
                })
            }
        },
        {
            name: 'Создать',
            callback: () => {
                window.app.openModal({
                    content:
                        <Form
                            schema={createSchema}
                            validator={validator}
                            onSubmit={d => {
                                window.app.closeModal();
                                create.mutate(d.formData);
                            }}
                        > <Button type={'submit'} variant={'contained'}>подтвердить</Button>
                        </Form>
                })
            }
        },
    ];
    return (
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>{
            actions.map(action =>
                <Button key={action.name} variant={'contained'} onClick={action.callback}>
                    {action.name}
                </Button>
            )
        }</Stack>
    )
}