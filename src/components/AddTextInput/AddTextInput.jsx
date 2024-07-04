import classes from "./AddTextInput.module.css";

import {useRef, useContext} from "react";
import { PageDataContext } from "../../store/Page-data-context";

export default function AddTextInput(){

    const {addText} = useContext(PageDataContext);

    const textValue = useRef();

    function onAdd(){
        addText(textValue.current.value);
        textValue.current.value = "";
    }

    return(
        <p> 
            <label className={classes.addTextLabel}> add text</label>
            <input ref={textValue}  className={classes.addText}/>
            <button onClick={onAdd} className={classes.addTextBtn}><i className="fa-solid fa-paragraph" style={{color: "#ffffff"}}></i></button>
        </p>
    )
}