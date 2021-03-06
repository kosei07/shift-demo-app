import React from "react";
import  Button  from "@material-ui/core/Button";

const PrimaryButton =(props)=>{
    /*--------------他コンポーネントで利用されるボタン---------------*/
    return(
        <Button 
        color={props.color} 
        disabled={props.disabled} 
        variant="contained"
        onClick={()=>props.onClick()}>
            {props.label}
        </Button>
    )
}

export default PrimaryButton