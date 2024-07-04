import classes from "./LineElement.module.css";

import { useContext } from "react";
import { PageDataContext } from "../../../store/Page-data-context";

export default function LineElement({ position, width, height, backgroundColor, id, isSelected, isSelectedEdit }) {

    const { moveElement, selectElement, selectToEdit, changeWidth, changeHeight } = useContext(PageDataContext);

    const changeHeightPosition = {
        ...position,
        left: (Number(position.left.split("px")[0]) + Number(width.split("px")[0] / 2) - 15) + "px",
        top: (Number(position.top.split("px")[0]) + Number(height.split("px")[0]) + "px")
    }

    const changeWidthPosition = {
        ...position,
        left: (Number(position.left.split("px")[0]) + Number(width.split("px")[0])) + "px",
        top: (Number(position.top.split("px")[0]) + Number(height.split("px")[0] / 2) + "px")
    }

    if (isSelectedEdit) {
        return (
            <>
                <div>

                    <div className={classes.changeHeightWrapper} style={changeHeightPosition}>
                        <p>H: {height}</p>
                        <button className={classes.changeHeight} onMouseMove={changeHeight}></button>
                    </div>

                    <div className={classes.changeWidthWrapper} style={changeWidthPosition}>
                        <p>W: {width}</p>
                        <button className={classes.changeWidth} onMouseMove={changeWidth}></button>
                    </div>
                   
                    <div
                        className={isSelected ? classes.line + " SELECTED" : classes.line}
                        id={id}
                        style={{ ...position, width, height, backgroundColor }}
                        onMouseMove={(e) => moveElement(e, "lineElements")}
                        onMouseDown={(e) => selectElement(e, "lineElements")}
                        onMouseUp={(e) => selectElement(e, "lineElements")}
                        onDoubleClick={(e) => selectToEdit(e, "lineElements")}
                        edit={isSelectedEdit ? "EDIT" : ""}
                    >
                    </div>
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <div
                    className={isSelected ? classes.line + " SELECTED" : classes.line}
                    id={id}
                    style={{ ...position, width, height, backgroundColor }}
                    onMouseMove={(e) => moveElement(e, "lineElements")}
                    onMouseDown={(e) => selectElement(e, "lineElements")}
                    onMouseUp={(e) => selectElement(e, "lineElements")}
                    onDoubleClick={(e) => selectToEdit(e, "lineElements")}
                    edit={isSelectedEdit ? "EDIT" : ""}
                >
                </div>
            </>
        )
    }
}