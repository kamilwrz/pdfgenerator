import classes from "./LineControl.module.css";

import { useContext } from "react";
import { PageDataContext } from "../../../store/Page-data-context";



export default function LineControl() {

    const { addLine, changeLineColor, centerLine, lineElements } = useContext(PageDataContext);

    const element = lineElements.find(element => element.isSelectedEdit === true)

    if(element){
    return (
        <div className={classes.lineWrapper}>
            <p>
                <label className={classes.label}> add line</label>
                <button
                    onClick={addLine}
                    className={classes.addLineBtn}>
                    <i className="fa-solid fa-grip-lines fa-xl" style={{ color: "rgb(255, 255, 255)" }}></i>
                </button>
            </p>
            <p>
                <label className={classes.label}>color</label>
                <input className={classes.editColor} type="color" onChange={changeLineColor} value={element.backgroundColor} />
            </p>
            <p>
                <button className={classes.btnCenter} onClick={() => centerLine(element.width)}> C</button>
            </p>
            <p>
                <button className={classes.btnDelete}><i className="fa-solid fa-trash-can" style={{ color: "#ffffff" }}></i></button>
            </p>
        </div>

    )}
    else{
        return(
            <div className={classes.lineWrapper}>
            <p>
                <label className={classes.label}> add line</label>
                <button
                    onClick={addLine}
                    className={classes.addLineBtn}>
                    <i className="fa-solid fa-grip-lines fa-xl" style={{ color: "rgb(255, 255, 255)" }}></i>
                </button>
            </p>
            <p>
                <label className={classes.label}>color</label>
                <input className={classes.editColor} type="color" onChange={changeLineColor} value="" />
            </p>
            <p>
                <button className={classes.btnCenter} onClick={() => centerLine(element.width)}> C</button>
            </p>
            <p>
                <button className={classes.btnDelete}><i className="fa-solid fa-trash-can" style={{ color: "#ffffff" }}></i></button>
            </p>
        </div>
        )
    }

}