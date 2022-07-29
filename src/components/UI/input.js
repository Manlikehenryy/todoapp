import styles from './input.module.css'
import React from 'react';

const Input = React.forwardRef((props,ref)=>{
    console.log(styles);
    return <input 
    
    style={props.styles} ref={ref} {...props.input} className={props.class} ></input>;
})

export default Input;