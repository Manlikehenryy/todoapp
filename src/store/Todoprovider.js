import Todocontext from "./Todocontext";
import { useReducer } from "react";

const d = new Date()
const currday = d.getDate();    /* returns a no btw 1-31 */
const currmonth = d.getMonth(); /* returns a no btw 0-11 */
const curryear = d.getFullYear(); /* returns four digit yyyy */

let today = `${curryear}-${currmonth + 1}-${currday}`

const defaultTodoState = { 
   dummy : [
   {id :1,
    sectionid: 'new task',
   title: 'Quarterly newsletter',
   time: today,
   tag: 0,
   checked: false
   },
   {id :2,
    sectionid: 'new task',
    title: 'Mobile app launch',
   time: '2022-05-20',
   tag: 1,
   checked: true
   }       
   ,     
    { id: 3,
        sectionid: 'today',
      title: 'Going for a Jog',
      time: '2022-08-03',
      tag: 2,
      checked: false

      },
      {id :4,
        sectionid: 'school',
        title: 'Open day at school',
      time: '2022-06-13',
      tag: 3,
      checked: false

      },{id :5,
        sectionid: 'school',
        title: 'P.T.A meeting',
      time: '2022-06-30',
      tag: 3,
      checked: false

      },{id :6,
        sectionid: 'today',
        title: 'Eat Vegetables',
      time: '2022-06-13',
      tag: 2,
      checked: false

      }
    ],
   sections: [
    { name: 'New Task',
      id:'new task',
      showSection:true

    },
    { name: 'Today',
     id:'today',
     showSection:true

    },
    { name: 'School',
    id:'school',
    showSection:true
   }
   ],

    tag : [
        {name:'Work',
         color:'rgb(20, 150, 206)'
        },
        {name:'Goals',
        color:'#ffa500'
       },
       {name:'Health',
       color:'#3ded97'
      },
      {name:'School',
      color:'#865fcf'
     }
    ],

    tagscreated: 4,
    todocreated: 6
}
  

    const todoReducer =(state,action)=>{
        let tagindex = null;

        //---------------------------------------
        //  REDUCER FOR CLOSE SECTION
        // --------------------------------------
        if (action.type === 'CLOSESECTION') {
            let  sectionIndex = state.sections.findIndex(value=> value.id === action.id);
            let sectionitem =  state.sections[sectionIndex];
            let updateditem = {...sectionitem,showSection:!sectionitem.showSection}
            let updateditems = [...state.sections];
            updateditems[sectionIndex] = updateditem;
            return {
              dummy : state.dummy,
                  tag : state.tag,
                  sections: updateditems,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }  

        //---------------------------------------
        //  REDUCER FOR UNCHECKING TODO
        // --------------------------------------
        if (action.type === 'UNCHECKTODO') {
            let  itemIndex = state.dummy.findIndex(value=> value.id === action.id);
            let todoitem =  state.dummy[itemIndex];
            let updateditem = {...todoitem,checked:false}
            let updateditems = [...state.dummy];
            updateditems[itemIndex] = updateditem;
            return {
              dummy : updateditems,
                  tag : state.tag,
                  sections: state.sections,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }  

        //---------------------------------------
        //  REDUCER FOR CHECKING TODO
        // --------------------------------------
        if (action.type === 'CHECKTODO') {
            let  itemIndex = state.dummy.findIndex(value=> value.id === action.id);
            let todoitem =  state.dummy[itemIndex];
            let updateditem = {...todoitem,checked:true}
            let updateditems = [...state.dummy];
            updateditems[itemIndex] = updateditem;
            return {
              dummy : updateditems,
                  tag : state.tag,
                  sections: state.sections,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }  

        //---------------------------------------
        //  REDUCER FOR UPDATING SECTION
        // --------------------------------------
        if (action.type === 'UPDATESECTION') {
            let  sectionindex =  action.item.previndex;
            let updateditems = state.dummy.map(value=>{
                if (value.sectionid === action.item.previd) {
                    value.sectionid = action.item.id;
                    return value
                }
                else{
                    return value
                }
            })
            let updatedsection = {id:action.item.id,name:action.item.name,showSection:state.sections[sectionindex].showSection}
            let sections = state.sections
            sections[sectionindex] = updatedsection
            return {
              dummy : updateditems,
                  tag :state.tag,
                  sections: sections,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }
         

        //---------------------------------------
        //  REDUCER FOR DELETING SECTION
        // --------------------------------------
        if (action.type === 'REMOVESECTION') {
            let  updatedsection = state.sections.filter(value=> value.id !== action.id);
            let  updateditems = state.dummy.filter(value=> value.sectionid !== action.id);
            return {
              dummy : updateditems,
                  tag :state.tag,
                  sections: updatedsection,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }
         

        //---------------------------------------
        //  REDUCER FOR CREATING SECTION
        // --------------------------------------
        if (action.type === 'ADDSECTION') {
          let updatedsection = state.sections.concat([{...action.item}])

            return {
                 dummy : state.dummy,
                  tag : state.tag,
                  sections: updatedsection,
                  tagscreated: state.tagscreated,
                  todocreated: state.todocreated
                 };
          }
         

        //---------------------------------------
        //  REDUCER FOR DELETING TODO
        // --------------------------------------
        if (action.type === 'REMOVETODO') {
          let  updateditems = state.dummy.filter(value=> value.id !== action.id);
          
          return {
            dummy : updateditems,
                tag :state.tag,
                sections: state.sections,
                tagscreated: state.tagscreated,
                todocreated: state.todocreated
               };
        }
       

       //---------------------------------------
        //  REDUCER FOR UPDATING TODO
        // --------------------------------------
        if (action.type === 'UPDATETODO') {
            let  itemIndex = state.dummy.findIndex(value=> value.id === action.item.id);
            let todoitem =  state.dummy[itemIndex];
            let newtag = state.tag;
            let updateditem;
            let updateditems;
            let totaltag;

            state.tag.forEach((v,index)=>{
                if (v.name.toUpperCase() === action.item.tag.toUpperCase() ) {
                   tagindex = index;
                }
            })
         
            // -----------------------------------------------------
            // IF TAG EXISTS ALREADY
            // -----------------------------------------------------

         if (tagindex !== null) {

             totaltag = state.tagscreated
               updateditem = {
                ...todoitem,
                sectionid: action.item.sectionid,
                title: action.item.title,
                time: action.item.date,    
                tag: tagindex  
            };
             updateditems = [...state.dummy];
            updateditems[itemIndex] = updateditem;
         }
    // -----------------------------------------------------
   //  IF TAG DOES NOT EXIST, CREATES NEW TAG
  // -----------------------------------------------------
       else  if (tagindex === null) {
                totaltag = state.tagscreated
                totaltag = totaltag + 1;
                let tagid = totaltag - 1
            let red = Math.trunc(Math.random()*255);
            let blue = Math.trunc(Math.random()*255);
            let green = Math.trunc(Math.random()*255);
          newtag = state.tag.concat({name: action.item.tag,
          color: `rgb(${red},${blue},${green})`
          })
           updateditem = {
            ...todoitem,
            sectionid: action.item.sectionid,
            title: action.item.title,
            time: action.item.date,   
            tag:  tagid   
        };
         updateditems = [...state.dummy];
        updateditems[itemIndex] = updateditem;    
     

         }
            return {
              dummy : updateditems,
                  tag : newtag,
                  sections: state.sections,
                  tagscreated: totaltag,
                  todocreated: state.todocreated
                 };
          }
         

        //---------------------------------------
        //  REDUCER FOR CREATING TODO
        // --------------------------------------

        if (action.type === 'ADDTODO') {
            let updateditems;
            let newtag;
            let totaltag;
            let updatedtotaltodo
            
            state.tag.forEach((v,index)=>{
                if (v.name.toUpperCase() === action.item.tag.toUpperCase() ) {
                   tagindex = index;
                }
             
            })

            // -----------------------------------------------------
            // IF TAG EXISTS ALREADY
            // -----------------------------------------------------

         if (tagindex !== null) {
             totaltag = state.tagscreated
            const totaltodo = state.todocreated
             updatedtotaltodo = totaltodo + 1;
              newtag = state.tag;

                updateditems = state.dummy.concat({
                 id : updatedtotaltodo,
                 sectionid: action.item.sectionid,
                 title: action.item.title,
                     time: action.item.date,
                     tag: tagindex,
                     checked:false
                 })  ;    
         }
    // -----------------------------------------------------
   //  IF TAG DOES NOT EXIST, CREATES NEW TAG
  // -----------------------------------------------------
       else  if (tagindex === null) {
          
                totaltag = state.tagscreated
            const totaltodo = state.todocreated
             updatedtotaltodo = totaltodo + 1;
                totaltag = totaltag + 1;
                let tagid = totaltag - 1
            let red = Math.trunc(Math.random()*255);
            let blue = Math.trunc(Math.random()*255);
            let green = Math.trunc(Math.random()*255);
          newtag = state.tag.concat({name: action.item.tag,
          color: `rgb(${red},${blue},${green})`
          })

                updateditems = state.dummy.concat({
                 id : updatedtotaltodo,
                 sectionid: action.item.sectionid,
                 title: action.item.title,
                     time: action.item.date,
                     tag:  tagid,
                     checked:false
                 })  ;    
         }

     
       

            return {
                dummy : updateditems,
                    tag : newtag,
                    sections: state.sections,
                    tagscreated: totaltag,
                    todocreated: updatedtotaltodo
                   };
        }
              return state;

    }


    //  ---------------------------------------------------
    // provider JSX COMPONENT
   //  ---------------------------------------------------

const Todoprovider=(props)=>{

const addItemToTodo =(item)=>{
dispatchAction({
    item:item,
    type: 'ADDTODO'
})
}

const addItemToSection=(item)=>{
    console.log(item);
    dispatchAction({
        item:item,
        type: 'ADDSECTION'
    })
    }

const removeItemFromTodo =(id)=>{
    dispatchAction({
        id:id,
        type: 'REMOVETODO'
    })   
}

const updateItemFromSection =(item)=>{
    dispatchAction({
        item:item,
        type: 'UPDATESECTION'
    })   
}

const removeItemFromSection =(id)=>{
    dispatchAction({
        id:id,
        type: 'REMOVESECTION'
    })   
}

const updateTodoItem =(item)=>{
    dispatchAction({
        item:item,
        type: 'UPDATETODO'
    })   
}

const checkTodoItem=(id,action)=>{
  if (action === 'CHECK') {
    dispatchAction({
        id:id,
        type: 'CHECKTODO'
    })  
  }
  if (action === 'UNCHECK') {
    dispatchAction({
        id:id,
        type: 'UNCHECKTODO'
    })  
  }
}

const closeSectionItem=(id)=>{
    dispatchAction({
        id:id,
        type: 'CLOSESECTION'
    })  
}

    const [todoState,dispatchAction] = useReducer(todoReducer,defaultTodoState);
    // const [tagState,dispatchTagAction] = useReducer(tagReducer,defaultTagState);
const todocontext = {
    items: todoState.dummy,
        tag: todoState.tag,
        todocreated: todoState.todocreated,
        sections: todoState.sections,
        addTodo: addItemToTodo,
        addSection: addItemToSection,
        removeTodo:removeItemFromTodo,
        updateTodo:updateTodoItem,
        checkTodo: checkTodoItem,
        removeSection: removeItemFromSection,
        updateSection: updateItemFromSection,
        closeSection: closeSectionItem
}

    return <Todocontext.Provider value={todocontext}>
        {props.children}
    </Todocontext.Provider>
}

export default Todoprovider;