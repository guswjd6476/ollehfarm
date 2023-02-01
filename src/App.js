import "./reset.css"
import './style.css'
import { Mobile, PC, Tablet } from "./MediaQuery"
import {AppRouter, MAppRouter}  from "./AppRouter";
import React, { useState,useEffect } from "react";

function App() {
 
    return (  
      <>
      <PC>
        <AppRouter/>
      </PC>
      <Tablet>
        <MAppRouter/>
      </Tablet>
      <Mobile>
        <MAppRouter/>
      </Mobile>
     </>
    ); 
  }
  
  export default App;