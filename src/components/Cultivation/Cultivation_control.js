
import { Select , Button, Form, Input, Switch} from 'antd';
import {ControlOutlined, CloseOutlined} from '@ant-design/icons';
import axios from 'axios';
import React, { useState,useEffect,useRef } from "react";
import Progressbar from 'react-js-progressbar';
import DriveMenuButton from "./driveMenu_Button";
import useInterval from '../../useInterval';


function Cultivation_control() {
    const publish_Data_url = "/api/sendValue"; // publish Message Tx data url
    const [airCnt, setAirCnt] = useState(0);//풍량설정 카운트 핸들러
    const [humidityCnt, setHumidityCnt] = useState(1); //습도설정 카운트 핸들러
    const [timeSetCnt, setTimeSetCnt] = useState(1); //시간설정 카운트 핸들러

    const [humicon, setHumicon] = useState(false)

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

    const [remote, setRemote] = useState(false)
    const [object, setObject] = useState()
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
        //setImgSrc(auto)
        driveCMD = "A10";
        setDriveCMD(driveCMD);
        return (
          driveName + driveCMD
        )
      }
      else if (control.target.name == "제습 자동") {
        const driveName = "제습자동";
        setDriveName(driveName);
        //setImgSrc(autohum)
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
        //setImgSrc(autohum)
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
       //setImgSrc(autoclean)
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
        //setImgSrc(autoclean)
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
       // setImgSrc(autodust)
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
       // setImgSrc(autodust)
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
        //setImgSrc(auto)
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
        //setImgSrc(auto)
        driveCMD = "A10";
        setDriveCMD(driveCMD);
        return (
          driveName + driveCMD
        )
      }
      else if (control.target.name == "제습 자동") {
        const driveName = "제습자동";
        setDriveName(driveName);
        //setImgSrc(autohum)
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
        //setImgSrc(autohum)
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
        //setImgSrc(autoclean)
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
       // setImgSrc(autoclean)
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
       // setImgSrc(autodust)
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
       // setImgSrc(autodust)
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
        //setImgSrc(auto)
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
      const el = useRef()
      useEffect(()=>{
        const handlemenu = (e) => {
            if(remote && el.current&&!el.current.contains(e.target)){
              setRemote(false)
            }
        };
        document.addEventListener('mousedown', handlemenu)
        
        return () => {
            document.removeEventListener('mousedown', handlemenu)
        }
    },[remote])

    // useEffect(()=>{
    //   axios
    //     .get('/api/gettemp',{
    //       params: {
    //         cmd : 'F008D14CF85A'
    //       }
    //     })
    //     .then(function (response) {
    //       setObject(response.data)
    //       console.log(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // })
    console.log(window.location.port,'??????')
    useInterval(() => {
      axios
        .get('/api/gettemp',{
          params: {
            num : '01'
          }
        })
        .then(function (response) {
          setObject(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
  }, 1000);
  console.log(object)
    return (  
        
        <div className="tab1">
          {object ? 
            <div style={{position : 'relative', height : '100%'}} className='main_content'>
                <Form  className='control_form'>
                    <div className='control_contain'>
                        <div className='control_box'>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                    <Progressbar
                                        input={object.temperature}
                                        pathWidth={20}
                                        pathColor={['yellow', 'red']} // use an array for gradient color.
                                        trailWidth={15}
                                        trailColor='#dedede' // use a string for solid color.
                                        textStyle={{ fill: 'red', fontSize: "20px", fontWeight: "900" }} // middle text style
                                        textPosition={{ x: '50%', y: '50%' }}
                                        shape={"full circle"}
                                      customText={'온도 : ' + object.temperature + "℃"}
                                    >
                                    </Progressbar>
                                </div>
                            <div className='progress_detail' style={{textAlign : 'center', padding : '20px'}} >
            
                                <div>이슬점온도 : </div>
                            </div>
                            <div className='remote_box' style={{display:'flex', justifyContent : 'space-between'}}>
                                <Form.Item
                                    label="설정온도"
                                    name="tempture"
                                >
                                    <Input />
                                </Form.Item>
                                <Button type="primary">Submit</Button>
                            </div>
                            </div>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                    <Progressbar
                                        input={object.humidity}
                                        pathWidth={20}
                                        pathColor={['lightblue', 'blue']} // use an array for gradient color.
                                        trailWidth={15}
                                        trailColor='#dedede' // use a string for solid color.
                                        textStyle={{ fill: 'blue', fontSize: "20px", fontWeight: "900" }} // middle text style
                                        textPosition={{ x: '50%', y: '50%' }}
                                        shape={"full circle"}
                                    customText={'습도'  + object.humidity + "%"}
                                    >
                                    </Progressbar>
                                </div>
                                <div className='progress_detail' style={{textAlign : 'center', padding : '20px'}} >
                                    <div>절대습도 : </div>
                                </div>
                                <div className='remote_box'>
                                    <Form.Item
                                        label="설정습도"
                                        name="humidity"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Button type="primary">Submit</Button>
                                </div>
                            </div>
                        </div>
                        <Button onClick={()=>setRemote(!remote)} className='humicon_btn'>{remote ? <CloseOutlined />: <ControlOutlined />}</Button>
                        <div ref={el}  className= {remote? 'mobile_humicon_box humicon_box' :'humicon_box'}>
                          <div className='humicon_box_header'>
                            <div className='humicon_box_title'>
                              <p>시리얼넘버 : </p>
                              <p>장소 : </p>
                            </div>  
                            <div className='humicon_box_detail'>
                              <p>운전모드 : </p>
                              <p>풍량 : </p>
                              <p>운전주기 : </p>
                              <p>운전시간 : </p>
                            </div> 
                          </div>
                          <Switch style={{width:'100%', marginBottom:'20px'}} onChange={e=>setHumicon(!humicon)}  checkedChildren="활성화" unCheckedChildren="비활성화" />
                            <div className='humicon_box_btn' style={{display:"flex", flexWrap:'wrap', justifyContent:'space-between'}}>
                            
                                <DriveMenuButton humicon={humicon} buttons={["스마트 운전", `제습 자동`, "제습\n수동\n", "환기 자동", "환기 수동", "청정 자동", "청정 수동", "스케쥴 운전", "운전 정지"]}
                                doSomethingAfterClick={buttonDriveMode} />
                                <Button disabled={!humicon} className={humicon ? "publishButton" : "publishdisabled"} onClick={(packetData) => submit_ButtonDriveSet(packetData)}  htmlType="submit" variant="contained">운전 적용</Button>
                                <Select
                                    onChange={e => {
                                        setAirCnt(e < 3 ? e + 1 : e); 
                                        console.log("풍량증가 cnt :", e);
                                        fnFild_airVolume_Set(e)
                                    }}
                                    disabled={air_disabled || !humicon}
                                    defaultValue="풍량설정"
                                    style={!remote ?{
                                        width: '100%',
                                        padding : '20px 0'
                                    } : {
                                      width: '100%',
                                      padding : '5px 0'
                                    }}
                                    options={[
                                        {
                                        value: '3',
                                        label: '강풍',
                                        },
                                        {
                                        value: '2',
                                        label: '중풍',
                                        },
                                        {
                                        value: '1',
                                        label: '약풍',
                                        },
                                        {
                                        value: '0',
                                        label: '정지',
                                        },
                                        
                                    ]}
                                    />
                                <Select
                                    onChange={(e) => { setHumidityCnt(e < 8 ? e + 1 : e); console.log("습도증가 cnt :", e); fnFild_Humidity_Set(e, humiditySetCMD, humidity_disabled); }}
                                    disabled={humidity_disabled || !humicon}
                                    defaultValue="습도설정"
                                    style={!remote ?{
                                      width: '100%',
                                      padding : '20px 0'
                                  } : {
                                    width: '100%',
                                    padding : '5px 0'
                                  }}
                                    options={[
                                        {
                                        value: '1',
                                        label: '쾌적',
                                        },
                                        {
                                        value: '2',
                                        label: '30%',
                                        },
                                        {
                                        value: '3',
                                        label: '35%',
                                        },
                                        {
                                        value: '4',
                                        label: '40%',
                                        },
                                        {
                                        value: '5',
                                        label: '45%',
                                        },
                                        {
                                        value: '6',
                                        label: '50%',
                                        },
                                        {
                                        value: '7',
                                        label: '55%',
                                        },
                                        {
                                        value: '8',
                                        label: '60%',
                                        },
                                        
                                    ]}
                                    />
                                <Select
                                    onChange={(e) => { setTimeSetCnt(e < 7 ? e + 1 : e); fnFild_time_Set(e, timeCMD); }}
                                    disabled={!humicon}
                                    defaultValue="시간설정"
                                    style={!remote ?{
                                      width: '100%',
                                      padding : '20px 0'
                                  } : {
                                    width: '100%',
                                    padding : '5px 0'
                                  }}
                                    options={[
                                        {
                                        value: '0',
                                        label: 'off',
                                        },
                                        {
                                        value: '1',
                                        label: '1시간',
                                        },
                                        {
                                        value: '2',
                                        label: '2시간',
                                        },
                                        {
                                        value: '3',
                                        label: '3시간',
                                        },
                                        {
                                        value: '4',
                                        label: '4시간',
                                        },
                                        {
                                        value: '5',
                                        label: '5시간',
                                        },
                                        {
                                        value: '6',
                                        label: '6시간',
                                        },
                                        {
                                        value: '7',
                                        label: '7시간',
                                        },
                                        
                                    ]}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className='function_box' style={{display:'flex'}}>
                        <div>항온항습기</div>
                        <Button type="primary">Run</Button>
                        <Button type="primary" danger>Stop</Button>
                    </div>
                </Form>
            </div>
            : "loading"
          }
        </div>
    ); 
  }
  
  export default Cultivation_control;