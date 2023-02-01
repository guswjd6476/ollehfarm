
import { Select , Card, Button, Form,  Switch} from 'antd';
import axios from 'axios';
import {ControlOutlined, CloseOutlined} from '@ant-design/icons';
import React, { useState,useEffect,useRef } from "react";
import Progressbar from 'react-js-progressbar';
import DriveMenuButton from "./Cultivation/driveMenu_Button";
import temp from '../Images/circle_temp.PNG';
import hum from '../Images/circle_humidity.PNG'
import Weather from './weather/Weather';
import useInterval from '../useInterval';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
 

function Glasscontrol() {
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

    const [remotes, setRemotes] = useState(false)

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
            if(remotes && el.current&&!el.current.contains(e.target)){
              setRemotes(false)
            }
        };
        document.addEventListener('mousedown', handlemenu)
        return () => {
            document.removeEventListener('mousedown', handlemenu)
        }
    },[remotes])
    useInterval(() => {
      axios
        .get('/api/gettemp',{
          params: {
            num : '02',
            cmd : 'F008D14CF85A'
          }
        })
        .then(function (response) {
          setObject(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
  }, 1000);
    return (  
        <div className="mainbox glasscontrol">
            <div className='header'>
                <div className='head_name'>창측 온/습도 상태</div>
                <div className='option_contain' style={{width : '300px'}}>
                    <Weather/>
                </div>
            </div>
            {object ?
            <div style={{position : 'relative'}} className='main_content'>
                {/* <div className='cardbox' style={{display : 'flex', justifyContent:'space-between'}}>
                    <Card title="온도" style={{textAlign:"center", width : "calc(100% - 10px)"}}>
                        <Card.Grid hoverable={false} style={gridStyle}></Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>온도</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>습도</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>이슬점</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>실내</Card.Grid>
                        <Card.Grid style={gridStyle}>실내온도 값</Card.Grid>
                        <Card.Grid style={gridStyle}>실내습도 값</Card.Grid>
                        <Card.Grid style={gridStyle}>실내이슬점 값</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>유리창</Card.Grid>
                        <Card.Grid style={gridStyle}>유리창 온도값</Card.Grid>
                        <Card.Grid style={gridStyle}>유리창 습도값</Card.Grid>
                        <Card.Grid style={gridStyle}>유리창 이슬점값</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>실외</Card.Grid>
                        <Card.Grid style={gridStyle}>실외 온도값</Card.Grid>
                        <Card.Grid style={gridStyle}>실외 습도값</Card.Grid>
                        <Card.Grid style={gridStyle}>실외 이슬점값</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>가상데이터</Card.Grid>
                        <Card.Grid style={gridStyle}>가상데이터 온도값</Card.Grid>
                        <Card.Grid style={gridStyle}>가상데이터 습도값</Card.Grid>
                        <Card.Grid style={gridStyle}>가상데이터 이슬점값</Card.Grid>
                    </Card>
                </div> */}
                 <Form  className='control_form'>
                    <div className='control_contain'>
                        <div className='control_box'>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                <Card title="실내" style={{textAlign:"center", width : "calc(100% - 10px)"}}>
                                    <Card.Grid hoverable={false} style={gridStyle}>온도</Card.Grid>    
                                    <Card.Grid style={{width : '75%'}}>{object.intemp}℃</Card.Grid>  
                                    <Card.Grid hoverable={false} style={gridStyle}>습도</Card.Grid>    
                                    <Card.Grid style={{width : '75%'}}>{object.inhum}%</Card.Grid>    
                                    <Card.Grid hoverable={false} style={gridStyle}>이슬점</Card.Grid>    
                                    <Card.Grid style={{width : '75%'}}>10℃</Card.Grid>      
                                </Card>
                                </div>
                            </div>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                <Progressbar
                                        size={'100%'}
                                        input={object.glasshum}
                                        pathWidth={10}
                                        pathColor={['lightblue', 'blue']} // use an array for gradient color.
                                        trailWidth={6}
                                        trailColor='#dedede' // use a string for solid color.
                                        textStyle={{ fill: '#3700ff', fontSize: "14px", fontWeight: "900" }} // middle text style
                                        textPosition={{ x: '50%', y: '40%' }}
                                        shape={"full circle"}
                                    customText={'습도: ' + object.glasshum + "%"}
                                    >
                                    </Progressbar>
                                    <Progressbar
                                        size={'88%'}
                                        input={object.glasstemp}
                                        pathWidth={12}
                                        pathColor={['yellow', 'red']} // use an array for gradient color.
                                        trailWidth={8}
                                        trailColor='#dedede' // use a string for solid color.
                                        textStyle={{ fill: '#ff0000', fontSize: "16px", fontWeight: "900" }} // middle text style
                                        textPosition={{ x: '50%', y: '50%' }}
                                        shape={"full circle"}
                                        customText={'온도 : ' + object.glasstemp + "℃"}
                                    >
                                    </Progressbar>
                                    <Progressbar
                                        size={'76%'}
                                        input={20}
                                        pathWidth={14}
                                        pathColor={['yellow', 'red']} // use an array for gradient color.
                                        trailWidth={10}
                                        trailColor='#dedede' // use a string for solid color.
                                        textStyle={{ fill: '#ff5168', fontSize: "18px", fontWeight: "900" }} // middle text style
                                        textPosition={{ x: '50%', y: '64%' }}
                                        shape={"full circle"}
                                    customText={'이슬점 : ' + 20 + "℃"}
                                    >
                                    </Progressbar>       
                                </div>
                            </div>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                    <Card title="실외"  hoverable={true} style={{textAlign:"center", width : '100%', height:'100%'}}>
                                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center', flexDirection:'column'}}>
                                            <div className='temp_detail' style={{display:'flex', alignItems:'flex-end',  }}>
                                                <p style={{lineHeight:'56px', fontSize:'56px', fontWeight:'900', color:'red'}}>{object.outtemp}</p>
                                                <span style={{lineHeight:'30px', fontSize:'30px',fontWeight : '900'}}>℃</span>
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='others_detial'>
                                                <p style={{fontSize : '20px', fontWeight:'700', marginRight: '20px'}}>습도 : {object.outhum}%</p>
                                                <p style={{fontSize : '20px', fontWeight:'700'}}>이슬점 : 20℃</p>
                                            </div>
                                        </div>
                                    </Card>     
                                </div>
                            </div>
                            <div className='progress_contain' >
                                <div style={{width : '100%', height : '100%'}} className='progress_box'>
                                    <Card title="가상데이터"  hoverable={true} style={{textAlign:"left", width : '100%', height:'100%'}}>
                                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center', flexDirection:'column'}}>
                                            <div className='temp_detail' style={{display:'flex', alignItems:'center', padding:'10px' }}>
                                                <img style={{width:'100px', marginRight:'20px'}} src={temp}/>
                                                <p style={{lineHeight:'56px', fontSize:'56px', fontWeight:'900', color:'blue'}}>23</p>
                                                <span style={{lineHeight:'30px', fontSize:'30px',fontWeight : '900'}}>℃</span>
                                            </div>
                                            <div className='temp_detail' style={{display:'flex', alignItems:'center', padding:'10px' }}>
                                                <img style={{width:'100px', marginRight:'20px'}} src={hum}/>
                                                <p style={{lineHeight:'56px', fontSize:'56px', fontWeight:'900', color:'blue'}}>30</p>
                                                <span style={{lineHeight:'30px', fontSize:'30px',fontWeight : '900'}}>%</span>
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='others_detial'>
                                                  <p style={{fontSize : '20px', fontWeight:'700'}}>이슬점 : 20℃</p>
                                            </div>
                                        </div>
                                    </Card>   
                                </div>
                            </div>
                            
                        </div>
                        <Button onClick={()=>setRemotes(!remotes)} className='humicon_btn'>{remotes ? <CloseOutlined />: <ControlOutlined />}</Button>
                        <div ref={el}  className= {remotes? 'mobile_humicon_box humicon_box' :'humicon_box'}>
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
                                    style={{
                                        width: '100%',
                                        padding : '20px 0'
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
                                    style={{
                                        width: '100%',
                                        padding : '20px 0'
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
                                    style={{
                                        width: '100%',
                                        padding : '20px 0'
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
                </Form>
            </div>
            : loading }
        </div>
    ); 
  }
  
  export default Glasscontrol;