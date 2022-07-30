import Input from "../UI/input"
import classes from "./create.module.css"
import { useRef,useContext,useState,useEffect} from "react"
import Todocontext from "../../store/Todocontext"

const UpdateSection = (props)=>{
    const [showError,setShowError] = useState(false);
    const [SectIsValid,SetSectIsValid] = useState(true);
    const todo = useContext(Todocontext);
    const sectionInputRef = useRef();
    const [styles,setStyle] = useState('')

    useEffect(()=>{
       setTimeout(()=>{ setStyle('')},1000)
   },[styles])
   
    
const submitHandler=(e)=>{
    e.preventDefault()
    let sectionname = props.name.toUpperCase();
    let sectionIndex = todo.sections.findIndex(value=> value.id.toUpperCase() === sectionname);
    let sectionInput = sectionInputRef.current.value.toUpperCase().trim();
    let itemIndex = todo.sections.findIndex(val=>val.name.toUpperCase() === sectionInput)

// --------------------------------------------------------------------------------------
//  CHECKS IF A SPECIFIC INPUT FIELD IS EMPTY
// --------------------------------------------------------------------------------------
if (sectionInput === '' ) {
    setStyle(classes.shake)
    SetSectIsValid(false); 
}
else{
    SetSectIsValid(true); 
}

if (sectionInput !== "") { 
    if (itemIndex !== -1) {
        let existingsection = todo.sections[itemIndex].name.toUpperCase()
        if (existingsection === sectionname) {
           setShowError(false)
           todo.updateSection({
               previndex: sectionIndex,
               previd: sectionname.toLowerCase() ,
               id: sectionInputRef.current.value.toLowerCase().trim(),
               name: sectionInputRef.current.value.trim()
           })
           props.onclose()
        }
        else{
           setShowError(true)
           setStyle(classes.shake)
        }
       }
       else if(itemIndex === -1){
           setShowError(false)
           todo.updateSection({
               previndex: sectionIndex,
               previd: sectionname.toLowerCase() ,
               id: sectionInputRef.current.value.toLowerCase().trim(),
               name: sectionInputRef.current.value.trim()
           })
           props.onclose()
       }
}


}

const closeform=()=>{
    props.onclose();
 }


 return   <form onSubmit={submitHandler} className={classes.sec} style={{ width: '50%',
 height: '200px'}}>
    
    <h2>Update Section </h2>
    {showError && <p className={classes.error}>This section already exists</p> }  
    <Input  color={SectIsValid ? '' : "#f9b6b5"} ref={sectionInputRef} input={{type:'text',defaultValue:props.name}}/>
    <div>   
    <Input class={styles} styles={{backgroundColor:'black',borderRadius:'10px',border:'none'}} input={{type:'submit', value:'Update'}}/>
    <button type="btn" onClick={closeform} style={{backgroundColor:'#fff',borderRadius:'10px',border:'2px solid #000',color:'#000',fontWeight:'600'}}>Close</button>
     </div>
</form>
}

export default UpdateSection;