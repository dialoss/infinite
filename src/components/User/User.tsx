import React from 'react';
import {client} from "src/components/List/api";
import {useQuery} from "react-query";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const User = ({id}) => {
    const {data} = useQuery('user', () => client.usersRetrieve({id}));
    const formatData = (d) => d === undefined || d === null ? 'null' : d.toString();

    const rows = [];
    for (const k in data) {
        rows.push({key: k, value: formatData(data[k])})
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:700}}>Поле</TableCell>
                            <TableCell sx={{fontWeight:700}}>Значение</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                            >
                                <TableCell >{row.key}</TableCell>
                                <TableCell >{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*{*/}
            {/*    Object.keys(data).map(k => <div className={'mx-auto flex gap-2 justify-center'}>*/}
            {/*        <Typography fontWeight={600}>{k}</Typography>*/}
            {/*        <Typography variant={'body'}>{formatData(data[k])}</Typography>*/}
            {/*    </div>)*/}
            {/*}*/}
        </div>
    );
};

export default User;