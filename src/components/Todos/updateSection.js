import Input from "../UI/input"
import classes from "./create.module.css"
import { useRef,useContext,useState,useEffect} from "react"
import Todocontext from "../../store/Todocontext"

const UpdateSection = (props)=>{
    const [showError,setShowError] = useState(false);
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

else if(sectionInput === ""){
    setStyle(classes.shake)
}

}

const closeform=()=>{
    props.onclose();
 }


 return   <form onSubmit={submitHandler} className={classes.form} style={{ width: '50%',
 height: '200px'}}>
    
    <h2>Update Section </h2>
    {showError && <p style={{color:'red',fontSize:'13px',position:'absolute',left:'140px',top:'70px'}}>This section already exists</p> }  
    <Input ref={sectionInputRef} input={{type:'text',defaultValue:props.name}}/>
    <div>   
    <Input class={styles} styles={{backgroundColor:'black',borderRadius:'10px',border:'none'}} input={{type:'submit', value:'Update'}}/>
    <button type="btn" onClick={closeform} style={{backgroundColor:'#fff',borderRadius:'10px',border:'2px solid #000',color:'#000',fontWeight:'600'}}>Close</button>
     </div>
</form>
}

export default UpdateSection;