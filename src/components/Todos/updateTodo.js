import Input from "../UI/input"
import classes from "./create.module.css"
import TextArea from "../UI/textarea"
import { useRef,useContext,useState,useEffect} from "react"
import Todocontext from "../../store/Todocontext"

const UpdateTodo = (props)=>{
    const [showError,setShowError] = useState(false);
    const [SectIsValid,SetSectIsValid] = useState(true);
    const [TitleIsValid,SetTitleIsValid] = useState(true);
    const [DateIsValid,SetDateIsValid] = useState(true);
    const [TagIsValid,SetTagIsValid] = useState(true);
    const [styles,setStyle] = useState('')
    const todo = useContext(Todocontext);
       const titleInputRef = useRef();
       const dateInputRef = useRef();
       const tagInputRef = useRef();
    const sectionInputRef = useRef();
    
    useEffect(()=>{
        setTimeout(()=>{ setStyle('')},1000)
    },[styles])
       

// --------------------------------------------------------------------------------------
//  SENDS INPUT TO THE TODO CONTEXT API
// --------------------------------------------------------------------------------------
const submitHandler=(e)=>{
    e.preventDefault()

    let sectionInput = sectionInputRef.current.value.toLowerCase().trim();
    let titleInput = titleInputRef.current.value.trim()
    let dateInput = dateInputRef.current.value
    let tagInput = tagInputRef.current.value.trim()

// --------------------------------------------------------------------------------------
//  CHECKS IF A SPECIFIC INPUT FIELD IS EMPTY
// --------------------------------------------------------------------------------------
if (sectionInput === '' ) {
    SetSectIsValid(false); 
}
else{
    SetSectIsValid(true); 
}
if (titleInput === '' ) {
    SetTitleIsValid(false);
}
else{
    SetTitleIsValid(true);
}
if (dateInput === '') {
    SetDateIsValid(false);
}
else{
    SetDateIsValid(true);
}
if (tagInput === '') {
    SetTagIsValid(false);
}
else{
    SetTagIsValid(true);
}

// --------------------------------------------------------------------------------------
//  CHECKS IF ALL INPUT FIELD WERE ENTERED 
// --------------------------------------------------------------------------------------


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
    {showError && <p className={classes.error}>This section does not exist</p> }  
    <Input  color={SectIsValid ? '' : "#f9b6b5"} ref={sectionInputRef} input={{type:'text',defaultValue:props.section}}/>
    <TextArea  color={TitleIsValid ? '' : "#f9b6b5"} ref={titleInputRef} input={{type:'text',defaultValue:props.title}}/>
    <Input  color={DateIsValid ? '' : "#f9b6b5"} ref={dateInputRef} input={{type:'date',defaultValue:props.time}}/>
    <Input  color={TagIsValid ? '' : "#f9b6b5"} ref={tagInputRef} input={{type:'text',defaultValue:props.tag}}/>
    <div>   
    <Input class={styles} styles={{backgroundColor:'black',borderRadius:'10px',border:'none'}} input={{type:'submit', value:'Update'}}/>
    <button type="btn" className={classes} onClick={closeform}>Close</button>
     </div>
</form>
}

export default UpdateTodo;