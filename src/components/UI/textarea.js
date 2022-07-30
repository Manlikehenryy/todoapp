import React from "react"
import classes from './input.module.css'

const TextArea=React.forwardRef((props,ref)=>{

    return <textarea   style={{backgroundColor:props.color}} className={classes.text} ref={ref} {...props.input}>

    </textarea>
})

export default TextArea;