import React, { useState, useRef, useEffect, useCallback, Suspense, lazy, useMemo } from "react";
import {Select, Button, Space,  Tag, Typography, Slider, Switch, DatePicker, TimePicker, Layout } from 'antd';
import axios from 'axios';
import Progressbar from 'react-js-progressbar';
import DriveMenuButton from "./driveMenu_Button";
import { useLocation, useNavigate } from "react-router-dom"; 

// 이미지 
import hunaster from "../../Images/humaster_long_w.PNG";
import Humidity from '../../Images/circle_humidity.PNG';
import Temperature from '../../Images/circle_temp.PNG';
import Ph from '../../Images/circle_dust.PNG';
import Co2 from '../../Images/circle_co2.PNG';
import auto from '../../Images/auto2.PNG';
import autodust from '../../Images/auto_wind2.png';
import autohum from '../../Images/auto_hum2.png';
import autoclean from '../../Images/auto_clean_air2.PNG';
import auto_stop from '../../Images/auto_stop.png';

function Cultivation_humicon ({loginuser, naviGrade, business}) {
  const publish_Data_url = "/api/sendValue"; // publish Message Tx data url
  const [airCnt, setAirCnt] = useState(0);//풍량설정 카운트 핸들러
  const [humidityCnt, setHumidityCnt] = useState(1); //습도설정 카운트 핸들러
  const [timeSetCnt, setTimeSetCnt] = useState(1); //시간설정 카운트 핸들러

  const [air_disabled, setAir_Disabled] = useState(true); // 풍량 설정switch 상태표시
  const [air_checked, setAir_checked] = useState(false); // 풍량 설정switch 상태표시
  const [humidity_disabled, setHumidity_disabled] = useState(true); // 습도설정 switch 상태표시
  const [humidity_checked, setHumidity_checked] = useState(false); // 습도설정 switch 상태표시

  //Message definition
  const testPacket = "CCMD" // 고정 해더 (poweron)
  const [driveName, setDriveName] = useState("운전모드"); // 운전설정 글자 print
  const [imgsrc, setImgSrc] = useState("auto2.PNG"); // 운전설정 글자 print
  const [powerState, setPowerState] = useState("P1"); //power on off cmd
  const [driveCMD, setDriveCMD] = useState("");  // 운전설정 메뉴 cmd
  const [humiditySetCMD, setHumiditySetCMD] = useState(""); // 습도설정 cmd
  const [airVolumeCMD, setAirVolumeCMD] = useState(""); // 풍량설정 cmd
  const [timeCMD, setTimeCMD] = useState(""); //시간설정 cmd

    // 시리얼넘버 저장
  const [serialNum, setSerialNum] = useState(""); // 시리얼 저장
  const [place, setPlace] = useState (""); //설치장소 정보저장

  const [loading, setLoading] = useState(false)
  //----------------------------------------------------------------------------------------------// (1) 운전메뉴 관련 코드 start
  /*운전설정 눌렀을 때 보내지는 값(publish data) 관련*/
  function submit_ButtonDriveSet(e) {

    e.preventDefault(); // 새로고침 방치 함수
    axios.get(publish_Data_url, {
      params: {
        note: serialNum,
        message: testPacket + powerState + driveCMD + humiditySetCMD + airVolumeCMD + timeCMD,
      }
    })
      .then(function (response) {
        alert('확인')
      })
      .catch(function (error) {
        alert("error");
      })
      .then(function () {

      });
  }
  function fnFild_Power_Set(control, powerState) {
    if (control.target.name == "운전 정지") {
      const driveName = "운전정지";
      setDriveName(driveName);
      setImgSrc(auto_stop)
      powerState = "P0"
      setPowerState(powerState);
      
      return (
        driveName + powerState
      )
    }
      else {
        powerState = "P1"
        setPowerState(powerState);
        return powerState;
      }
  } 

  function fnFild_time_Set(timeSetCnt, timeCMD) {
    
    if (timeSetCnt == 1) {
      timeCMD = "1";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 2) {
      timeCMD = "2";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 3) {
      timeCMD = "3";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 4) {
      timeCMD = "4";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 5) {
      timeCMD = "5";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 6) {
      timeCMD = "6";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else if (timeSetCnt == 7) {
      timeCMD = "7";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
    else {
      timeCMD = "0";
      setTimeCMD(timeCMD);
      console.log(timeCMD);
      return timeCMD;
    }
  }

  function fnFild_airVolume_Set(airCnt, airVolumeCMD) {
    if (airCnt == 1) {
      airVolumeCMD = "W1";
      setAirVolumeCMD(airVolumeCMD);
      console.log(airVolumeCMD);
      return airVolumeCMD;
    }
    else if (airCnt == 2) {
      airVolumeCMD = "W2";
      setAirVolumeCMD(airVolumeCMD);
      console.log(airVolumeCMD);
      return airVolumeCMD;
    }
    else if (airCnt == 3) {
      airVolumeCMD = "W3";
      setAirVolumeCMD(airVolumeCMD);
      console.log(airVolumeCMD);
      return airVolumeCMD;
    }

    else {
      airVolumeCMD = "00";
      setAirVolumeCMD(airVolumeCMD);
      console.log(airVolumeCMD);
      return airVolumeCMD;
    }
  }

  function fnFild_Humidity_Set(humidityCnt, humiditySetCMD) {
    if (humidityCnt == 1) {
      humiditySetCMD = "H0";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 2) {
      humiditySetCMD = "H1";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 3) {
      humiditySetCMD = "H2";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 4) {
      humiditySetCMD = "H3";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 5) {
      humiditySetCMD = "H4";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 6) {
      humiditySetCMD = "H5";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 7) {
      humiditySetCMD = "H6";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else if (humidityCnt == 8) {
      humiditySetCMD = "H7";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }
    else {
      humiditySetCMD = "00";
      setHumiditySetCMD(humiditySetCMD);
      console.log(humiditySetCMD);
      return humiditySetCMD;
    }

  }
  function fnFildDriveMode(control, driveCMD, imgsrc) {
    if (control.target.name == "스마트 운전") {
      const driveName = "스마트운전";
      setDriveName(driveName);
      setImgSrc(auto)
      driveCMD = "A10";
      setDriveCMD(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "제습 자동") {
      const driveName = "제습자동";
      setDriveName(driveName);
      setImgSrc(autohum)
      driveCMD = "A20";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "제습 수동") {
      const driveName = "제습수동";
      setDriveName(driveName);
      setImgSrc(autohum)
      driveCMD = "A21";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "환기 자동") {
      const driveName = "환기자동";
      setDriveName(driveName);
      setImgSrc(autoclean)
      driveCMD = "A30";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "환기 수동") {
      const driveName = "환기수동";
      setDriveName(driveName);
      setImgSrc(autoclean)
      driveCMD = "A31";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }

    else if (control.target.name == "청정 자동") {
      const driveName = "청정자동";
      setDriveName(driveName);
      setImgSrc(autodust)
      driveCMD = "A40";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "청정 수동") {
      const driveName = '청정수동'
      setDriveName(driveName);
      setImgSrc(autodust)
      driveCMD = "A41";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "스케쥴 운전") {
      const driveName = '스케쥴운전'
      setDriveName(driveName);
      setImgSrc(auto)
      driveCMD = "A41";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else {
      const driveName = "명령없음"
      setDriveName(driveName);
      driveCMD = "000";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
  }
  function fnFildDriveMode(control, driveCMD, imgsrc) {
    if (control.target.name == "스마트 운전") {
      const driveName = "스마트운전";
      setDriveName(driveName);
      setImgSrc(auto)
      driveCMD = "A10";
      setDriveCMD(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "제습 자동") {
      const driveName = "제습자동";
      setDriveName(driveName);
      setImgSrc(autohum)
      driveCMD = "A20";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "제습 수동") {
      const driveName = "제습수동";
      setDriveName(driveName);
      setImgSrc(autohum)
      driveCMD = "A21";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "환기 자동") {
      const driveName = "환기자동";
      setDriveName(driveName);
      setImgSrc(autoclean)
      driveCMD = "A30";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "환기 수동") {
      const driveName = "환기수동";
      setDriveName(driveName);
      setImgSrc(autoclean)
      driveCMD = "A31";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }

    else if (control.target.name == "청정 자동") {
      const driveName = "청정자동";
      setDriveName(driveName);
      setImgSrc(autodust)
      driveCMD = "A40";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "청정 수동") {
      const driveName = '청정수동'
      setDriveName(driveName);
      setImgSrc(autodust)
      driveCMD = "A41";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else if (control.target.name == "스케쥴 운전") {
      const driveName = '스케쥴운전'
      setDriveName(driveName);
      setImgSrc(auto)
      driveCMD = "A41";
      setDriveCMD(driveCMD);
      console.log(driveCMD);
      return (
        driveName + driveCMD
      )
    }
    else {
      const driveName = "운전정지";
      //추가 구현 필요
      // setDriveName(driveName);
      // setImgSrc(auto)
      // driveCMD = "A10";
      // setDriveCMD(driveCMD);
      // return (
      //   driveName + driveCMD
      // )
    }
  }
  
  function noCMD_Default(air_disabled, humidity_disabled, airVolumeCMD, humiditySetCMD) {
    if (air_disabled == true) {
      airVolumeCMD = "00";
      setAirVolumeCMD(airVolumeCMD);
      return airVolumeCMD;
    }
    else if (humidity_disabled == true) {
      humiditySetCMD = "00";
      setHumiditySetCMD(humiditySetCMD);
      return humiditySetCMD;
    }
    else {
      airVolumeCMD = "00";
      setAirVolumeCMD(airVolumeCMD);
      humiditySetCMD = "00";
      setHumiditySetCMD(humiditySetCMD);
      return airVolumeCMD;
      return humiditySetCMD;
    }

  }

  const buttonDriveMode = (event) => { //운전 메뉴버튼 click 시 이벤트 처리

    console.log(event.target.name);
    fnFild_Power_Set(event, powerState);
    fnFildDriveMode(event, driveCMD);
    noCMD_Default(air_disabled - 1, humidity_disabled - 1, airVolumeCMD - 1, humiditySetCMD - 1);
    if ((event.target.name == "제습 수동") || (event.target.name == "환기 수동") || (event.target.name == "청정 수동")) {
      setAir_Disabled(false);
      setHumidity_disabled(true);
      setAir_checked(true);
      setHumidity_checked(false);


    }
    else if ((event.target.name == "스마트 운전") || (event.target.name == "제습 자동")) {
      setHumidity_disabled(false);
      setAir_Disabled(true);
      setAir_checked(false);
      setHumidity_checked(true);
    }
    else if ((event.target.name=="운전 정지")) {
      fnFild_Power_Set(event, )
    }

    else {
      setAir_Disabled(true);
      setHumidity_disabled(true);
      setAir_checked(false);
      setHumidity_checked(false);
    }
    //do some stuff here
  }

  const driveSet_default = { //운전설정 클릭 시 변경 전 UI style 정의
    "display": "block",
    "border": "none",
    "boxShadow": "3px 5px 5px 2px rgba(7, 7, 7, 0.5)",
    "background": "linear-gradient(45deg, #3b8ccb 0%, #3b8ccb 100%)",
    "borderRadius": "5px",
    "height": "40px",
    "fontSize": "18px",
    "fontWeight": "bold",
    "width": "100%",
    "textAlign": "center",
    "color": "white"
  }

  //----------------------------------------------------------------------------------------------//(1) 운전메뉴 관련 코드끝 

  //---------------------------------------------------------------------------------------------(2) 기타 : 아스키코드 -> hex? 
  function ascii_to_hex(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
  //---------------------------------------------------------------------------------------------(2) 기타 : 코트끝.


  //----------------------------------------------------------------------------------------------(3) 그래프 관련 코드 Start
  const [number, setNumber] = useState(0);
  const [objects, setObjects] = useState({});
  const navigate = useNavigate();
  const { Title } = Typography;

console.log(serialNum,'저장된 시리얼 넘버')
//    useInterval(() => {
//     if(serialNum){
//       axios
//       .get("/api/DriveStateData", {
//         params: {
//           note: serialNum,
//         }
//       })
//       .then(function (response) {
//         if(response&&!response.data){
//           navigate('/Home')
//           alert('확인')
//         }else{
//         setObjects(response.data);
//         setLoading(true)
//         //console.log("오브젝트",response.data);
//       }
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//     }
// }, 1000);
  //---------------------------------------------------------------------------------------------(3) 그래프 관련코드 끝

  //---------------------------------------------------------------------------------------------(4) 슬라이더 관련코드 Start
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const marks = {
    0: '0단계',
    10: '1단계',
    20: '2단계',
    30: '3단계',
    40: '4단계',
    50: '5단계',
    60: '6단계',
    70: '7단계',
    80: '8단계',
    90: '9단계',
  };

  const volume_air = {
    0: { label: '정지', style: { color: "", fontSize: "16x", fontWeight: "bold" } },
    1: { label: '약풍', style: { color: "", fontSize: "16x", fontWeight: "bold" } },
    2: { label: '중풍', style: { color: "", fontSize: "16x", fontWeight: "bold" } },
    3: { label: '강풍', style: { color: "", fontSize: "16x", fontWeight: "bold" } }
  };

  const set_humidity = {
    1: { label: '쾌적', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    2: { label: '30%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    3: { label: '35%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    4: { label: '40%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    5: { label: '45%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    6: { label: '50%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    7: { label: '55%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    8: { label: '60%', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
  };

  const set_time = {

    0: 'Off',
    1: { label: '1H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    2: { label: '2H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    3: { label: '3H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    4: { label: '4H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    5: { label: '5H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    6: { label: '6H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
    7: { label: '7H', style: { color: "", fontSize: "16px", fontWeight: "bold" } },
  };

  const style = {
    display: 'inline-block',

  };


  
  
    //------------------------------------------------------------------------------------(4) 슬라이더 관련코드 끝
  return (

    <div className="tab2">
      {/* <h1>운전설정 :{driveName},  풍량설정:{airCnt} ,   습도설정:{humidityCnt},   시간설정:{timeSetCnt} </h1> */}
      {/* <div>적용된 기기 : {serialNum}</div>  */}

      <Layout className="control_all_wrap" >

        <div style={{display:'flex', width : '100%'}} className="control_navi_wrap" >
          <form style={{width : '15%'}} onSubmit={(packetData) => submit_ButtonDriveSet(packetData)}>
            <Button className="control_main_btn" type="Primary" htmlType="submit" variant="contained" style={driveSet_default}>운전 적용</Button>
          </form>
          <div style={{display:'flex', width : '85%'}} className="control_navi_box">
            <DriveMenuButton buttons={["스마트 운전", "제습 자동", "제습\n수동", "환기 자동", "환기 수동", "청정 자동", "청정 수동", "스케쥴 운전", "운전 정지"]}
              doSomethingAfterClick={buttonDriveMode} />
          </div>
        </div>
        <Layout className="icon_control_wrap">
   
           <div className="control_wrap">
                <div className="control_box">
                  <Tag className="control_tag wind_control">
                    <Switch className="control_switch" checked={air_checked} disabled={air_disabled} checkedChildren={"풍량설정"} unCheckedChildren="풍량자동" defaultChecked />
                    <Tag className="control_main" >
                      <div>
                        {/* <Slider vertical value={objects && objects.windLevel * 10} marks={marks} step={9} defaultValue={3} onChange={(e)=>{console.log(e[1])}}/> */}
                        <Slider min={0} max={3} vertical marks={volume_air} step={null} defaultValue={0} onChange={(e) => { setAirCnt(e < 3 ? e + 1 : e); console.log("풍량증가 cnt :", e); fnFild_airVolume_Set(e); }} />
                      </div>
                    </Tag>
                    {/* <div className="control_sub_btn">
                    <Button  disabled={air_disabled} onClick={() => { setAirCnt(airCnt < 3 ? airCnt + 1 : airCnt); console.log("풍량증가 cnt :", airCnt + 1); fnFild_airVolume_Set(airCnt + 1); }} type="primary" > 증가 </Button>
                    <Button  disabled={air_disabled} onClick={() => { setAirCnt(airCnt > 0 ? airCnt - 1 : airCnt); console.log("풍량감소 cnt :", airCnt - 1); fnFild_airVolume_Set(airCnt - 1); }} type="danger" > 감소 </Button>
                  </div> */}
                  </Tag>

                  <Tag className="control_tag humidity_control">
                    <Switch className="control_switch" checked={humidity_checked} disabled={humidity_disabled} checkedChildren="습도설정" unCheckedChildren="습도자동" defaultChecked />
                    <Tag className="control_main" >
                      <div >
                        {/* <Slider vertical value={objects && objects.heaterLevel * 10} marks={marks} step={9} defaultValue={3} onChange={(e)=>{console.log(e[1])}}/> */}
                        <Slider min={1} max={8} vertical marks={set_humidity} step={null} defaultValue={0} onChange={(e) => { setHumidityCnt(e < 8 ? e + 1 : e); console.log("습도증가 cnt :", e); fnFild_Humidity_Set(e, humiditySetCMD, humidity_disabled); }} />
                      </div>
                    </Tag>
                    {/* <div className="control_sub_btn">  
                      <Button disabled={humidity_disabled} onClick={() => { setHumidityCnt(humidityCnt < 8 ? humidityCnt + 1 : humidityCnt); console.log("습도증가 cnt :", humidityCnt + 1); fnFild_Humidity_Set(humidityCnt + 1, humiditySetCMD, humidity_disabled); }} type="primary" > 증가 </Button>
                      <Button disabled={humidity_disabled} onClick={() => { setHumidityCnt(humidityCnt > 0 ? humidityCnt - 1 : humidityCnt); console.log("습도감소 cnt :", humidityCnt - 1); fnFild_Humidity_Set(humidityCnt - 1, humiditySetCMD, humidity_disabled); }} type="danger" > 감소 </Button>
                    </div>  */}
                  </Tag>

                  <Tag className="control_tag time_control">
                    <Switch className="control_switch" checkedChildren="시간설정" unCheckedChildren="연속운전" defaultChecked />
                    <Tag className="control_main" >
                      <div>
                        {/* <Slider vertical value={objects && objects.heaterLevel * 10} marks={marks} step={9} defaultValue={3} onChange={(e)=>{console.log(e[1])}}/> */}
                        <Slider min={0} max={7} vertical marks={set_time} step={null} defaultValue={0} onChange={(e) => { setTimeSetCnt(e < 7 ? e + 1 : e); fnFild_time_Set(e, timeCMD); }} />
                      </div>
                    </Tag>
                    {/* <div className="control_sub_btn">  
                    <Button onClick={() => { setTimeSetCnt(timeSetCnt < 7 ? timeSetCnt + 1 : timeSetCnt); fnFild_time_Set(timeSetCnt + 1, timeCMD); }} type="primary" > 증가 </Button>
                    <Button onClick={() => { setTimeSetCnt(timeSetCnt > 1 ? timeSetCnt - 1 : timeSetCnt); fnFild_time_Set(timeSetCnt - 1, timeCMD); }} type="danger" > 감소 </Button>
                  </div> */}
                  </Tag>
                  <Tag className="control_tag schedule_control">
                    <Switch className="schedule_switch" checkedChildren="스케쥴 주간" unCheckedChildren="스케쥴 주말" defaultChecked />
                    <div className="schedule">
                      <Space className="schedule_space" direction="vertical">
                        <TimePicker.RangePicker status="warning" size="large" />
                      </Space>
                      <div className="schedule_type" style={{ display: "flex" }}>
                        <>
                          <Select default="" size="large" style={{ width: 330 }}>
                            <Option value="스마트 운전">스마트 운전</Option>
                            <Option value="제습자동">제습자동</Option>
                            <Option value="환기자동">환기자동</Option>
                            <Option value="청정자동">청정자동</Option>
                            <Option value="운전정지">운전정지</Option>
                          </Select>
                        </>
                      </div>
                    </div>
                    <div className="schedule">
                      <Space className="schedule_space" direction="vertical">
                        <TimePicker.RangePicker status="warning" size="large" />
                      </Space>
                      <div className="schedule_type" style={{ display: "flex" }}>
                        <>
                          <Select default="" size="large" style={{ width: 330 }}>
                            <Option value="스마트 운전">스마트 운전</Option>
                            <Option value="제습자동">제습자동</Option>
                            <Option value="환기자동">환기자동</Option>
                            <Option value="청정자동">청정자동</Option>
                            <Option value="운전정지">운전정지</Option>
                          </Select>
                        </>
                      </div>
                    </div>
                    <div className="schedule">
                      <Space className="schedule_space" direction="vertical">
                        <TimePicker.RangePicker status="warning" size="large" />
                      </Space>
                      <div className="schedule_type" style={{ display: "flex" }}>
                        <>
                          <Select default="" size="large" style={{ width: 330 }}>
                            <Option value="스마트 운전">스마트 운전</Option>
                            <Option value="제습자동">제습자동</Option>
                            <Option value="환기자동">환기자동</Option>
                            <Option value="청정자동">청정자동</Option>
                            <Option value="운전정지">운전정지</Option>
                          </Select>
                        </>
                      </div>
                    </div>
                    <div className="schedule">
                      <Space className="schedule_space" direction="vertical">
                        <TimePicker.RangePicker status="warning" size="large" />
                      </Space>
                      <div className="schedule_type" style={{ display: "flex" }}>
                        <>
                          <Select default="" size="large" style={{ width: 330 }}>
                            <Option value="스마트 운전">스마트 운전</Option>
                            <Option value="제습자동">제습자동</Option>
                            <Option value="환기자동">환기자동</Option>
                            <Option value="청정자동">청정자동</Option>
                            <Option value="운전정지">운전정지</Option>
                          </Select>
                        </>
                      </div>
                    </div>
                    <div className="schedule">
                      <Space className="schedule_space" direction="vertical">
                        <TimePicker.RangePicker status="warning" size="large" />
                      </Space>
                      <div className="schedule_type" style={{ display: "flex" }}>
                        <>
                          <Select default="" size="large" style={{ width: 330 }}>
                            <Option value="스마트 운전">스마트 운전</Option>
                            <Option value="제습자동">제습자동</Option>
                            <Option value="환기자동">환기자동</Option>
                            <Option value="청정자동">청정자동</Option>
                            <Option value="운전정지">운전정지</Option>
                          </Select>
                        </>
                      </div>
                    </div>
                  </Tag>
                </div>
              </div>
              <div className="icon_wrap">
                <div className="auto_icon_wrap">
                  <Tag className="icon_tag auto_tag">
                    <div className="icon">
                      <img src={imgsrc} />
                      <Title className="icon_tag_title auto_tag_title" level={3}>{driveName}</Title>
                    </div>
                  </Tag>
                  <Tag className="icon_tag icon_temp_tag">
                    <div className="icon">
                      <Progressbar
                        input={Math.abs(objects.Info_RaTemperature)}
                        pathWidth={20}
                        pathColor={['#1d89e4', '#1d89e4']} // use an array for gradient color.
                        trailWidth={20}
                        trailColor='#dedede' // use a string for solid color.
                        textStyle={{ fill: '#1d89e4', fontSize: "32px", fontWeight: "900" }} // middle text style
                        textPosition={{ x: '50%', y: '35%' }}
                        shape={"semi circle"}
                        customText={objects && objects.Info_RaTemperature < 0 ? "-" + Math.abs(objects.Info_RaTemperature) + "℃" : Math.abs(objects.Info_RaTemperature) + "℃"}
                      >
                        <img src={Temperature} />
                      </Progressbar>
                          <Title level={3} className="icon_tag_title">온도</Title>
                    </div>
                  </Tag>
                  <Tag className="icon_tag icon_humidity_tag">
                    <div className="icon">
                      <Progressbar
                        input={objects && objects.Info_RaHumidity}
                        pathWidth={20}
                        pathColor={['#1d89e4', '#1d89e4']} // use an array for gradient color.
                        trailWidth={20}
                        trailColor='#dedede' // use a string for solid color.
                        textStyle={{ fill: '#1d89e4', fontSize: "32px", fontWeight: "900" }} // middle text style
                        textPosition={{ x: '50%', y: '35%' }}
                        shape={"semi circle"}
                        customText={objects && objects.Info_RaHumidity + "%"}
                      >
                        <img src={Humidity} />
                      </Progressbar>
                     {/* <LayeredProgressbar
                        percentage={30}
                        styles={{
                          path: {
                            strokeLinecap: "butt"
                          }
                        }}
                        renderOverlays={() =>
                          generateRadialSeparators(20).concat(
                            <div style={{ fontSize: 30 }}>{30}%</div>
                          )
                        }
                      /> */}
                                 
                      <Title level={3} className="icon_tag_title">습도</Title>
                    </div>
                  </Tag>
                  <Tag className="icon_tag icon_air_tag">
                    <div className="icon">
                      <Progressbar
                        input={objects && objects.Info_Co2/3000 * 100}
                         customText= {objects && objects.Info_Co2+" ppm"}
                        pathWidth={20}
                        pathColor={['#009423', '#009423']} // use an array for gradient color.
                        trailWidth={20}
                        trailColor='#dedede' // use a string for solid color.
                        textStyle={{ fill: '#009423', fontSize: "32px", fontWeight: "900" }} // middle text style
                        textPosition={{ x: '50%', y: '35%' }}
                        shape={"semi circle"}
                      >
                        <img src={Co2} />
                      </Progressbar>
                      <Title level={3} className="icon_tag_title">이산화탄소</Title>
                    </div>
                  </Tag>

                  <Tag className="icon_tag icon_dust_tag">
                    <div className="icon">
                      <Progressbar
                       input={objects.Info_Pm10}
                        pathWidth={20}
                        pathColor={['#009423', '#009423']} // use an array for gradient color.
                        trailWidth={20}
                        trailColor='#dedede' // use a string for solid color.
                        textStyle={{ fill: '#009423', fontSize: "32px", fontWeight: "900" }} // middle text style
                        textPosition={{ x: '50%', y: '35%' }}
                        shape={"semi circle"}
                        customText={objects && objects.Info_Pm10 + "㎍/㎥"}
                      >
                        <img  src={Ph} />
                      </Progressbar>
                      <Title level={3} className="icon_tag_title">미세먼지</Title>
                    </div>
                  </Tag>
                </div>
              </div>
            
             
            </Layout>
      </Layout>


    </div>

  )

}
export default Cultivation_humicon ;

