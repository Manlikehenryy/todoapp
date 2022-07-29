import style from './todolist.module.css'
import redbin from '../images/redbin.png'
import { useContext,useState } from "react";
import Todocontext from "../../store/Todocontext";
import TodoItem from "./todoitem";
import UpdateTodo from './updateTodo';
import UpdateSection from './updateSection';
import edit from '../images/edit.png'


function Todolist() {
    const dummydata = useContext(Todocontext)
  
    let selecteditem;
    const [showUpdate,setShowUpdate] = useState(false)
    const [showEdit,setShowEdit] = useState({})
    const [showSection,setShowSection] = useState(false)
    const [editSection,setEditSection] = useState({})
 
   const edithandler=(id)=>{
   let index = dummydata.items.findIndex(value => value.id === id);
    selecteditem = dummydata.items[index];
    let tagname = dummydata.tag[selecteditem.tag].name;
    let object = {...selecteditem,tag:tagname}
    setShowEdit(object)
    setShowUpdate(true)
    }

    
   const sectionEditHandler=(id)=>{
    let index = dummydata.sections.findIndex(value => value.id === id);
     selecteditem = dummydata.sections[index];
     let object = {...selecteditem}
     setEditSection(object)
     setShowSection(true)
     }

    const deletehandler=(id)=>{
        dummydata.removeTodo(id)
        }
        const checkhandler=(id)=>{
            dummydata.checkTodo(id,'CHECK')
            }
         
     const unCheckhandler=(id)=>{
        dummydata.checkTodo(id,'UNCHECK')
     }

    const closeEdit=()=>{
         setShowUpdate(false)
         }   
         const closeSection=()=>{
            setShowSection(false)
            }   
   

    const deleteSec=(id)=>{
        dummydata.removeSection(id)
    }
 
const closeorhide=(id)=>{
dummydata.closeSection(id)
}
    return<><div className={ style.overflow}>
        {dummydata.sections.map((section)=>
            <div key={section.id}>
                <div className={style.flex}> 

              <span className={style.section}>
                <div onClick={()=>{closeorhide(section.id)}} className={style.triangle} 
                style={section.showSection ? { transform:'rotate(0deg)',top:'30px'} : { transform:'rotate(-90deg)',top:'23px', left: '22px'}}>
                </div>
              <h4 onClick={()=>{sectionEditHandler(section.id)}} className={style}>{section.name}</h4>
              </span>
                <span className={style.position}>
                <span onClick={()=> sectionEditHandler(section.id)}> <img src={edit} className={style.edit} alt='edit'/></span>
                <span onClick={()=>deleteSec(section.id)} className={style.image}> <img  src={redbin} alt='delete'/></span> 
                </span>
                </div>
                    
              {section.showSection && <ul className={style.col}>
               { dummydata.items.map(items=>{ 
                let date;
 /*-----------------------------------To get month and day--------------------------------------------------------*/
                  const datearr = items.time.split('-')
                  let year = datearr[0]
                  let month = datearr[1]
                  let day =  datearr[2]
                  year = Number(year)
                  month = Number(month)
                  day = Number(day)
                  const montharr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
                  const d = new Date()
                  const currday = d.getDate();    /* returns a no btw 1-31 */
                  const currmonth = d.getMonth(); /* returns a no btw 0-11 */
                  const curryear = d.getFullYear(); /* returns four digit yyyy */
    
                  if (year === curryear && month === currmonth + 1 && day === currday) {
                   date = 'Today';
                  }
                 else if (year < curryear ) {
                    date = `${montharr[month - 1]} ${day} ${year}`  ;
                   }
                   else{
                   date = `${montharr[month - 1]} ${day} `  ;
                  }
 /*-----------------------------------CHECKS IF TITLE IS GREATER THAN 25, THEN ADDS ELLIPSIS(CONTINUATION)--------------------------------------------------------*/     
                  let title
                  if (items.title.length > 25) {
                     title = items.title.slice(0,25)
                    title = `${title}...`
                  }
                  else{
                     title = items.title
                  }

  return   section.id === items.sectionid &&<TodoItem  key={items.id} edithandler={edithandler} unCheckhandler={unCheckhandler} checkhandler={checkhandler} deletehandler={deletehandler} checked={items.checked} id={items.id} title={title} time={date}
      tag={dummydata.tag[items.tag].name}  color={dummydata.tag[items.tag].color} />  
    
})}
             </ul>}
            </div>
        )} 
    </div>
    { showSection && <UpdateSection onclose={closeSection} id={editSection.id} name={editSection.name} /> } 
   { showUpdate && <UpdateTodo onclose={closeEdit} id={showEdit.id} title={showEdit.title} tag={showEdit.tag} time={showEdit.time} section={showEdit.sectionid} /> } 
    </>
}


export default Todolist;