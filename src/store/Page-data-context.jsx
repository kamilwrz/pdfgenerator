import { useContext, createContext } from "react";

//1. SETUP THE CONTEXT - auto-completion
export const PageDataContext = createContext({
    textElements: [],
    lineElements: [],
    addText: () => {},
    moveElement: () => {},
    selectElement: () => {},
    selectToEdit: () => {},
    changeFontSize: () => {},
    changeTextColor: () => {},
    changeText: () => {}, 
    deleteText: () => {},
    addLine: () => {},
    centerLine: () => {},
    changeLineColor: () => {},
    changeWidth: () => {},
    changeHeight: () => {}
});