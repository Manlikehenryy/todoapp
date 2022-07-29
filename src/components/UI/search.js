import styles from './search.module.css'
import searchsymbol from '../images/searchsymbol.png'
import { useRef} from 'react';

function Search(props) {
  const  searchInputRef = useRef()


    const onEnter=(e)=>{
      setTimeout(()=>{lookup()},500) 
    }

    const lookup=()=>{
      const searchInput = searchInputRef.current.value;
      if (searchInput.trim() !== '') {
        props.onSearch(searchInput);
      }
   
    }

    return <div className={styles.container}>
      <img className={styles.search} src={searchsymbol} alt='search'/>
      <input type="search" placeholder='search for todos or tags' ref={searchInputRef} className={styles} onKeyUp={onEnter} />
     
      </div>
    
      ;
}
export default Search;