import styles from './todoitem.module.css'
import style from './todolist.module.css'
import bin from '../images/bin.png'
import check from '../images/darkgreycheck.png'
import greencheck from '../images/greencheck3.png'
import edit from '../images/edit.png'

const TodoItem =(props)=>{
    const deleteitem =(id)=>{
     props.deletehandler(id)
    }
    const edititem =(id)=>{
       props.edithandler(id);
       }
       const addDone =(id)=>{
        props.checkhandler(id);
        }    
        const notDone =(id)=>{
          props.unCheckhandler(id); 
          }    
    return  <li className={styles.list}> 
    <span>
   <span onClick={()=>addDone(props.id)}> {!props.checked && <img src={check} className={styles.check}  alt='check'/> } </span>
  <span onClick={()=>notDone(props.id)}> {props.checked && <img src={greencheck} className={styles.check}  alt='check'/> } </span>
    <span onClick={()=> edititem(props.id)} style={props.checked ? {color:'#21cc79',width:'50%',marginLeft:'5px'} : {width:'50%',marginLeft:'5px'}} 
    className={style.item}>{props.title}</span> 
    </span>

<span>   
      <span style={{marginRight:'3px'}}>
      <span className={styles.tagbtn} style={{backgroundColor:props.color}}>{props.tag}</span> 
     <span style={props.time === 'Today' ? {color:'#21cc79'}:{}}>{props.time}</span>
            </span> 
    
     <span onClick={()=> edititem(props.id)}> <img src={edit} className={styles.edit} alt='edit'/></span>
     <span onClick={()=> deleteitem(props.id)}> <img src={bin} className={styles.bin}  alt='bin'/></span>
</span>
      </li>

}

export default TodoItem;