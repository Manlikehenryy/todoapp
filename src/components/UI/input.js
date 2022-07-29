import styles from './input.module.css'
import React from 'react';

const Input = React.forwardRef((props,ref)=>{
    // const closefn=()=>{
    //     props.closeform()
    // }
    return <input 
    // onClick={closefn}
    
    style={props.styles} ref={ref} {...props.input} className={props.class} ></input>;
})

export default Input;