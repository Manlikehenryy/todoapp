import styles from './navbar.module.css'
import Search from '../UI/search';

function Navbar(props) {
const searchInput=(input)=>{
props.onSearch(input);
}
const addTodo=()=>{
  props.onadd()
}

    return <nav>
  
          <ul>
            <li>MY TASKS </li>
            <li className={styles.fade}>INBOX</li>
          </ul>
          <div onClick={addTodo} className={styles.add}>
          <div>+</div>
          </div>
 
         <Search onSearch={searchInput}/>
    </nav>
}

export default Navbar;