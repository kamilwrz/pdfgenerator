import { useContext, useState } from "react";
import { PageDataContext } from "../../../store/Page-data-context";

import classes from "./TextControl.module.css"

export default function TextControl() {

    const { changeFontSize, changeTextColor, changeText, deleteText, textElements } = useContext(PageDataContext);

    const element = textElements.find(element => element.isSelectedEdit === true);

    if (element) {
        return (
            <menu className={classes.menu}>
                <p>
                    <label className={classes.label}>Font Size</label>
                    <input className={classes.fontSize} type="number" onChange={changeFontSize} value={Number(element.fontSize.split("px")[0])} />
                </p>
                <p>
                    <label className={classes.label}>Edit Text</label>
                    <input className={classes.editText} type="text" onChange={changeText} value={element.text} />
                </p>
                <p>
                    <label className={classes.label}>Color</label>
                    <input className={classes.editColor} type="color" onChange={changeTextColor} value={element.fontColor} />
                </p>
                <p>
                    <button className={classes.btnDelete} onClick={deleteText}><i className="fa-solid fa-trash-can" style={{color: "#ffffff"}}></i></button>
                </p>
            </menu>
        )
    }

    else {
        return (
            <menu className={classes.menu}>
                <p>
                    <label className={classes.label}>Font Size</label>
                    <input className={classes.fontSize} type="number" onChange={changeFontSize} value="" />
                </p>
                <p>
                <label className={classes.label}>Edit Text</label>
                <input className={classes.editText} type="text" onChange={changeText} value="" />
                </p>

                <p>
                    <label className={classes.label}>Color</label>
                    <input className={classes.editColor} type="color" value="" />
                </p>

                <p>
                    <button className={classes.btnDelete} onClick={deleteText}><i className="fa-solid fa-trash-can" style={{color: "#ffffff"}}></i></button>
                </p>
               
            </menu>
        )
    }
}