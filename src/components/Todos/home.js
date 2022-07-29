import Card from "../layout/card";
import Navbar from "../layout/navbar";
import Button from "../UI/button";
import styles from './home.module.css'
import style from './todolist.module.css'
import Todolist from "./todolist";
import CreateTodo from "./createTodo";
import CreateSection from "./createsection";
import Todocontext from "../../store/Todocontext";
import TodoItem from "./todoitem";
import UpdateTodo from './updateTodo';
import UpdateSection from './updateSection';

import { useState,useContext } from "react";

function Home() {
    const [ShowForm,SetShowForm] = useState(false)
    const [ShowSection,SetShowSection] = useState(false)
    const [ShowSearch,SetShowSearch] = useState(false)
    const [ShowTodo,SetShowTodo] = useState(true)
    const [showEdit,setShowEdit] = useState({})
    const [editSection,setEditSection] = useState({})
    const [showUpdate,setShowUpdate] = useState(false)
    const [ShowUpdateSection,SetShowUpdateSection] = useState(false)
    const [searchInput,setSearchInput] = useState('')

 
    const dummydata = useContext(Todocontext)


    const showModal = ()=>{
     SetShowForm(true)
    }

    const showSection = ()=>{
        SetShowSection(true)
       }

       const closeSection = ()=>{
        SetShowSection(false)
       }
       const closeSectionEdit = ()=>{
        SetShowUpdateSection(false)
        SetShowSearch(false)
        SetShowTodo(true)
       }

    const closeModal = ()=>{
        SetShowForm(false);
       }

       const closeEdit=()=>{
        setShowUpdate(false)
        }   
       
   const edithandler=(id)=>{
   let index = dummydata.items.findIndex(value => value.id === id);
    let selecteditem = dummydata.items[index];
    let tagname = dummydata.tag[selecteditem.tag].name;
    let object = {...selecteditem,tag:tagname}
    setShowEdit(object)
    setShowUpdate(true)
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


    const runSearch=(input)=>{
        setSearchInput(input)
        SetShowTodo(false)
        SetShowSearch(true)
    }

    const returnback=()=>{
        SetShowTodo(true)
        SetShowSearch(false)
    }


       const SearchResult=(props)=>{
        let keyword = props.input.toLowerCase()
        let itemIndex = dummydata.items.findIndex(value=>value.title.toLowerCase().includes(keyword))
        let tagIndex = dummydata.tag.findIndex(value=>value.name.toLowerCase().includes(keyword))
 
 /*-----------------------------------CHECKS IF KEYWORD IS A TODO OR A TAG--------------------------------------------------------*/
if (itemIndex !== -1 || tagIndex !== -1) {
     return   dummydata.items.map((items,index)=>{
        if (items.title.toLowerCase().includes(keyword) || dummydata.tag[items.tag].name.toLowerCase().includes(keyword)) {
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
                      if (items.title.length > 20) {
                         title = items.title.slice(0,20)
                        title = `${title}...`
                      }
                      else{
                         title = items.title
                      }



            return        <ul className={style.col}>
       


   <TodoItem  key={items.id} edithandler={edithandler} unCheckhandler={unCheckhandler} checkhandler={checkhandler} deletehandler={deletehandler} checked={items.checked} id={items.id} title={title} time={date}
tag={dummydata.tag[items.tag].name}  color={dummydata.tag[items.tag].color} />




         </ul>
        }
        else{
            return <></>
        }
       
     
        }) 
}
//      /*-----------------------------------IF THE KEYWORD ISN'T FOUND--------------------------------------------------------*/

         else{
           return <>
            <h2>Sorry, we couldn't find any results for "{keyword}" </h2>
            <h3>Try adjusting your search,Here are some ideas</h3>
            <ul style={{display:'flex',flexDirection:'column'}}>
                <li style={{listStyle: 'initial'}}>Make sure all words are spelled correctly</li>
                <li style={{listStyle: 'initial'}}>Try searching for a Tag or Section</li>
            </ul>
           </>
         }

  }



    return (<div>
        <Navbar onadd={showModal} onSearch={runSearch}/>
        <Card>
           
       <Button type={'btn'} onadd={showModal}>{'Add Task'}</Button>
       <Button onadd={showSection} class={styles.section}>{'Add Section'}</Button>
      
       {ShowTodo && <Todolist/>} 
       {ShowSearch && <div className={ style.overflow}>
       

        <SearchResult input={searchInput}/>
     
        </div>}
      { ShowSearch &&   <button onClick={returnback} className={styles.back}>Go Back</button>}
    </Card>
    { ShowSection && <CreateSection onclose={closeSection}/>}
   {ShowForm && <CreateTodo onclose={closeModal}/>}
   { ShowUpdateSection && <UpdateSection onclose={closeSectionEdit} id={editSection.id} name={editSection.name} /> } 
   { showUpdate && <UpdateTodo onclose={closeEdit} id={showEdit.id} title={showEdit.title} tag={showEdit.tag} time={showEdit.time} section={showEdit.sectionid} /> } 
   
    </div>)
}

export default Home;