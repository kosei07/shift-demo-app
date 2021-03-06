import React from "react";
import  TextField from "@material-ui/core/TextField";

const TextInput = (props)=>{
        /*--------------他コンポーネントで利用されるテキストインプット---------------*/
    return(
        <TextField 
        fullWidth={props.fullWidth}
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        required={props.required}
        rows={props.rows}
        value={props.value}
        type ={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        />
    )
}

export default TextInput