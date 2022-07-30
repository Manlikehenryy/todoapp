import classes from "./create.module.css"
import { useRef,useContext,useState,useEffect} from "react"
import Input from "../UI/input"
import Todocontext from "../../store/Todocontext"

const CreateSection =(props)=>{
const sectionInputRef = useRef();
const [SectIsValid,SetSectIsValid] = useState(true);
 const todo = useContext(Todocontext);
 const [showError,setShowError] = useState(false);
 const [styles,setStyle] = useState('')

 useEffect(()=>{
    setTimeout(()=>{ setStyle('')},1000)
},[styles])

const submitHandler=(e)=>{
    e.preventDefault()
    let sectionInput = sectionInputRef.current.value.toLowerCase().trim();
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


    if (sectionInput !== '') {
        const existingSection = todo.sections.findIndex(val=>val.id === sectionInput)
        if (existingSection === -1) {
            props.onclose();
            setShowError(false);
                  todo.addSection({
                id: sectionInputRef.current.value.toLowerCase().trim() ,
                name: sectionInputRef.current.value.trim(),
                showSection:true
            });
        }
        else{     
            setShowError(true)
            setStyle(classes.shake)
    }
    }



         }




         const closeform=()=>{
            
            props.onclose();
         }

         return <form onSubmit={submitHandler} className={classes.sec} style={{ width: '50%',
         height: '200px'}}>
     <h2>Create A Section </h2>
     {showError && <p className={classes.error} >This section already exists</p> }  
     <Input color={SectIsValid ? '' : "#f9b6b5"} ref={sectionInputRef} input={{type:'text',placeholder:'Enter Section Title'}}/>
      <div>   
      <Input  class={styles} input={{type:'submit', value:'Create'}}/>
      <button  type="btn" onClick={closeform} style={{backgroundColor:'#fff',borderRadius:'10px',border:'2px solid #000',color:'#000',fontWeight:'600'}}>Close</button>
     </div>
 </form>

}




export default CreateSection;