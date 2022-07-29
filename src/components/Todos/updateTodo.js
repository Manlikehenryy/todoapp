import Input from "../UI/input"
import classes from "./create.module.css"
import TextArea from "../UI/textarea"
import { useRef,useContext,useState,useEffect} from "react"
import Todocontext from "../../store/Todocontext"

const UpdateTodo = (props)=>{
    const [showError,setShowError] = useState(false);
    const [styles,setStyle] = useState('')
    const todo = useContext(Todocontext);
       const titleInputRef = useRef();
       const dateInputRef = useRef();
       const tagInputRef = useRef();
    const sectionInputRef = useRef();
    
    useEffect(()=>{
        setTimeout(()=>{ setStyle('')},1000)
    },[styles])
       

const submitHandler=(e)=>{
    e.preventDefault()

    let sectionInput = sectionInputRef.current.value.toLowerCase().trim();
    let titleInput = titleInputRef.current.value.trim()
    let dateInput = dateInputRef.current.value
    let tagInput = tagInputRef.current.value.trim()
    if (sectionInput !== '' && titleInput !== '' && dateInput !== '' && tagInput !== ''){
        const existingSection = todo.sections.findIndex(val=>val.id === sectionInput)
        if (existingSection !== -1) {
            setShowError(false)
            todo.updateTodo({
                id: props.id,
                sectionid: sectionInput ,
                title: titleInput,
                date: dateInput,
                tag:tagInput,
            })
            props.onclose()
        }
        else{     
            setShowError(true)
            setStyle(classes.shake)
    }
    }
    else if(sectionInput === '' || titleInput === '' || dateInput === '' || tagInput === ''){
        setStyle(classes.shake) 
    }




}

const closeform=()=>{
    props.onclose();
 }

 return   <form onSubmit={submitHandler} className={classes.form}>
    <h2>Update To-Do </h2>
    {showError && <p style={{color:'red',fontSize:'13px',position:'absolute',left:'140px',top:'70px'}}>This section does not exist</p> }  
    <Input ref={sectionInputRef} input={{type:'text',defaultValue:props.section}}/>
    <TextArea ref={titleInputRef} input={{type:'text',defaultValue:props.title}}/>
    <Input ref={dateInputRef} input={{type:'date',defaultValue:props.time}}/>
    <Input ref={tagInputRef} input={{type:'text',defaultValue:props.tag}}/>
    <div>   
    <Input class={styles} styles={{backgroundColor:'black',borderRadius:'10px',border:'none'}} input={{type:'submit', value:'Update'}}/>
    <button type="btn" className={classes} onClick={closeform}>Close</button>
     </div>
</form>
}

export default UpdateTodo;