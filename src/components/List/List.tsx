import React from 'react';
import {useQuery} from "react-query";
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {client} from "./api";
import {ListActions} from "src/components/List/ListActions";
import {columns} from "src/components/List/config";


const List = () => {
    const {isLoading, data} = useQuery('users', () => client.usersList());
    const ref = React.useRef();

    if (isLoading) return <Typography textAlign={'center'} variant={'h4'}>
        Загрузка...
    </Typography>

    return (
        <div>
            <Box sx={{width: '100%'}}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    apiRef={ref}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <div className={'h-[50px]'}></div>
            <ListActions listRef={ref}></ListActions>
        </div>
    );
};

export default List;