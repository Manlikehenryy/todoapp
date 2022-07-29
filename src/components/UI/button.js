import styles from './button.module.css';

function Button(props) {
    function setState() {
    props.onadd()
    }
    return <button onClick={setState} className={props.class}>{props.children}</button>;
}

export default Button;