import classes from "./TextElement.module.css";

import { useContext } from "react";
import { PageDataContext } from "../../../store/Page-data-context";

export default function TextElement({ text, position, fontSize, color, fontFamily, id, isSelected, isSelectedEdit }) {

    const { moveElement, selectElement, selectToEdit} = useContext(PageDataContext);

    return (
        <p
            className={isSelected ? classes.text + " SELECTED" : classes.text}
            id={id}
            style={{ ...position, fontSize, color, fontFamily }}
            onMouseMove={(e) => moveElement(e, "textElements")}
            onMouseDown={(e) => selectElement(e, "textElements")}
            onMouseUp={(e) => selectElement(e, "textElements")}
            onDoubleClick={(e) => selectToEdit(e, "textElements")}
            edit={isSelectedEdit ? "EDIT" : ""}
        > 
            {text}
        </p>
    )
}