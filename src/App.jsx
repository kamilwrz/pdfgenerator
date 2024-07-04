import { nanoid } from 'nanoid'
import { PageDataContext } from './store/Page-data-context.jsx'

import Navbar from './components/Navbar/Navbar.jsx';
import A4 from './components/A4/A4.jsx';

import AddTextInput from './components/AddTextInput/AddTextInput.jsx'

import LineControl from './components/ControlElements/LineControl/LineControl.jsx';
import TextControl from './components/ControlElements/TextControl/TextControl.jsx';

import TextElement from './components/PageElements/TextElement/TextElement.jsx';
import LineElement from './components/PageElements/LineElement/LineElement.jsx';



import { useState } from 'react'

function App() {

  //PAGE DATA
  /**
   * TEXT
   * LINES / RECTANGLE SHAPES
   * IMGS - IN THE MAKING...
   */
  const [pageData, setPageData] = useState({
    textElements: [],
    lineElements: [],
  })

  /**
   * FUNCTION FOR TEXT ELEMENTS
   */

  //add Text to A4 Page
  function handleAddText(text) {
    const newText = {
      id: nanoid(),
      text: text,
      position: { left: "10px", top: "50px" },
      fontSize: "12px",
      fontColor: "rgb(0, 0, 0)",
      fontFamily: "Helvetica",
      isSelected: false,
      isSelectedEdit: false,
    };
    setPageData(prevData => {
      return {
        ...prevData,
        textElements: [...prevData.textElements, newText]
      }
    });
  }
  //delete Text from A4 PAGE
  function handleDeleteText(){
    setPageData(prevData => {
      const updatedData = prevData.textElements.filter(element => element.isSelectedEdit !== true)
      return {
        ...prevData,
        textElements: [...updatedData]
      }
    })
  }
  //change the font size of the text element that is selected
  function handleChangeFontSize(e) {
    setPageData(prevData => {
      return {
        ...prevData,
        textElements: prevData.textElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, fontSize: e.target.value + "px" }
          }
          return element
        })
      }
    })
  }
  //change the text value of the text element that is selected
  function handleChangeText(e){
    setPageData(prevData => {
      return {
        ...prevData,
        textElements: prevData.textElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, text: e.target.value }
          }
          return element
        })
      }
    })
  }
  //change the color of the text element that is selected
  function handleChangeTextColor(e){
    setPageData(prevData => {
      return {
        ...prevData,
        textElements: prevData.textElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, fontColor: e.target.value }
          }
          return element
        })
      }
    })
  }

  /**
   * FUNCTION FOR LINE / RECTANGLE ELEMENTS
   */

  // add line / rectangle element to A4 Page 
  function handleAddLine(){
       const newLine = {
        id:nanoid(),
        position:{left: "0px", top:"0px"},
        backgroundColor:"rgb(0, 0, 0)",
        width:"400px",
        height:"5px",
        isSelected: false,
        isSelectedEdit: false,
       }

       setPageData(prevData => {
        return {
          ...prevData,
          lineElements: [...prevData.lineElements, newLine]
        }
      });
  }

  function handleChangeLineColor(e){
    setPageData(prevData => {
      return {
        ...prevData,
        lineElements: prevData.lineElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, backgroundColor: e.target.value }
          }
          return element
        })
      }
    })
  }

  //CENTER ELEMENT
  /**
   * 595 - elWidth / 2 = left
   */

  function handleCenterLine(elementWidth){
    const leftCentered = (595 - Number(elementWidth.split("px")[0])) / 2 + "px";
    console.log(leftCentered);
    setPageData(prevData => {
      return {
        ...prevData,
        lineElements: prevData.lineElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, position: {left: leftCentered, top: element.position.top}}
          }
          return element
        })
      }
    })

  }



    /**
   * FUNCTION FOR ELEMENTS - more then one usage
   */

  //Move the element in the A4 Page
  function handleMoveElement(e, identifier) {

    const idx = pageData[identifier].findIndex(element => e.target.id === element.id);

    setPageData(prevData => {

      let newPositionLeft = prevData[identifier][idx].position.left;
      let newPositionTop = prevData[identifier][idx].position.top;

      newPositionLeft = e.pageX - e.target.offsetParent.offsetLeft - (e.target.clientWidth / 2) + "px";
      newPositionTop = e.pageY - e.target.offsetParent.offsetTop - (e.target.clientHeight /2) + "px";

      console.log(e.movementY, e.target.clientHeight);

      if(e.target.clientHeight < 2){
      //movement when line 1px
      newPositionTop = e.pageY - e.target.offsetParent.offsetTop + e.movementY + "px";
      }


      return {
        ...prevData,
      [identifier]: prevData[identifier].map(element => {
          if (element.id === e.target.id && element.isSelected) {
            return { ...element, position: { left: newPositionLeft, top: newPositionTop } }
          }
          return element
        })
      }
    })
  }

  //change SELECTED
  function handleSelect(e, identifier) {
    setPageData(prevData => {
      return {
        ...prevData,
        [identifier]: prevData[identifier].map(element => {
          if (element.id === e.target.id) {
            if(element.isSelected){
              return { ...element, isSelected:false}
            }else{
              return { ...element, isSelected:true}
            }
          }
          return element
        })
      }
    })
  }

  //change selected edit
  function handleSelectEdit(e, identifier) {
    console.log(e);
    setPageData(prevData => {
      return {
        ...prevData,
        [identifier]: prevData[identifier].map(element => {
          if (element.id === e.target.id) {
            if(element.isSelectedEdit){
              return { ...element, isSelectedEdit:false}
            }else{
              return { ...element, isSelectedEdit:true}
            }
          }
          return element
        })
      }
    })
  }

  function handleChangeWidth(e){
      setPageData(prevData => {
        return {
          ...prevData,
          lineElements: prevData.lineElements.map(element => {
            if (element.isSelectedEdit) {
              return { ...element, width: Number(element.width.split("px")[0]) + Number(e.movementX) + "px" }
            }
            return element
          })
        }
      })
  }

  function handleChangeHeight(e){
    setPageData(prevData => {
      return {
        ...prevData,
        lineElements: prevData.lineElements.map(element => {
          if (element.isSelectedEdit) {
            return { ...element, height: Number(element.height.split("px")[0]) + Number(e.movementY) + "px" }
          }
          return element
        })
      }
    })
}

  //generate text jsx textElements from state
  const TEXTS = pageData.textElements.map(element => (
    <TextElement
      key={element.id}
      text={element.text}
      position={element.position}
      fontSize={element.fontSize}
      color={element.fontColor}
      fontFamily={element.fontFamily}
      id={element.id}
      isSelected={element.isSelected}
      isSelectedEdit={element.isSelectedEdit}
    />
  ))

  const LINES = pageData.lineElements.map(element => (
    <LineElement
    id={element.id}
    key={element.id}
    width={element.width}
    height={element.height}
    backgroundColor={element.backgroundColor}
    position={element.position}
    isSelected={element.isSelected}
    isSelectedEdit={element.isSelectedEdit}
    />
  ))

  const ctxValue = {

    //STATEs
    textElements: pageData.textElements,
    lineElements: pageData.lineElements,

    //FN FOR TEXT ELEMENTS
    addText: handleAddText,
    deleteText: handleDeleteText,
    changeText: handleChangeText,
    changeFontSize: handleChangeFontSize,
    changeTextColor: handleChangeTextColor,

    //FN FOR LINE ELEMENTS
    addLine: handleAddLine,
    changeLineColor: handleChangeLineColor,
    centerLine: handleCenterLine,

    //FN FOR ELEMENTS (multiple usage)
    moveElement: handleMoveElement,
    selectElement: handleSelect,
    selectToEdit: handleSelectEdit,
    changeWidth: handleChangeWidth,
    changeHeight: handleChangeHeight,
  }

  return (
    <PageDataContext.Provider value={ctxValue}>

      <Navbar>
        <AddTextInput />
        <LineControl />
        <TextControl />
      </Navbar>

      <A4>
        {TEXTS}
        {LINES}
      </A4>

    </PageDataContext.Provider>
  )
}

export default App
