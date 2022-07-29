import styles from './button.module.css';

function Button(props) {
    function setState() {
    props.onadd()
    console.log(styles);
    }
    return <button onClick={setState} className={props.class}>{props.children}</button>;
}

export default Button;