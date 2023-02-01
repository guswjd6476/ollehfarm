
import React, { useEffect, useState } from "react";
//import "../../../UI_CSS/deviceInformation_UI_Style.css"

import "./button.css"

const DriveMenuButton = ({humicon, buttons, doSomethingAfterClick }) => {
  
  const [clickedId, setClickedId] = useState(-1);
  useEffect(()=>{
    if(!humicon){
      setClickedId(false)
    }
  })
  
  
    const handleClick = (event, id) => {
      setClickedId(id);
      doSomethingAfterClick(event);
    };
  
    return (
      <>
        {buttons.map((buttonLabel, i) => (
          <button
            disabled={!humicon}
            key={i}
            name={buttonLabel}
            onClick={(event) => handleClick(event, i)}
            className={(i === clickedId ? "customButton active" : (!humicon ? 'disabled' : "customButton"))  }
          
          >
            {buttonLabel}
          </button>
        ))}
      </>
    );
  };
  
  export default DriveMenuButton;