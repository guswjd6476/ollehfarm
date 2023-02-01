
import { Select ,Tabs} from 'antd';
import axios from 'axios';
//import React, { useState,useEffect } from "react";
import Cultivation_control from './Cultivation_control';
import Cultivation_humicon from './Cultivation_humicon';
import Weather from '../weather/Weather';

//const { Option, OptGroup } = Select;
const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  const gridStyles = {
    width: '100%',
    textAlign: 'center',
  };
const fruit = [
    {id : 1,
    name : '딸기'
    },
    {id : 2,
        name : '상추'
        },
]
const items = [
    {
      key: '1',
      label: `재배실`,
      children: <Cultivation_control/>,
    },
    {
      key: '2',
      label: `휴미콘`,
      children: <Cultivation_humicon/>,
    },
  ];
function Cultivation() {
 
    return (  
      <div className="mainbox cultivation">
        <div className='header'>
                <div className='head_name'>재배실 관리</div>
                <div className='option_contain' style={{width : '300px'}}>
                    <Weather/>
                </div>
            </div>
        <Tabs defaultActiveKey="1" items={items}  />
      </div>
    ); 
  }
  
  export default Cultivation;