import React from "react";
import {Avatar, Button} from "@mui/material";

export const AvatarWidget = function (props) {
    return (
        <div className={'flex items-center gap-2 flex-wrap justify-center'}>
            <Avatar sx={{width: 100, height: 100}} src={props.value}
                    onClick={() => props.onChange(!props.value)} alt={''}/>
            <Button variant={'contained'} component="label"
            >Загрузить фото
                <input
                    type="file"
                    hidden
                    onChange={e => {
                        console.log(e)
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onload = () => props.onChange(reader.result);
                    }}
                /></Button>
        </div>
    );
};