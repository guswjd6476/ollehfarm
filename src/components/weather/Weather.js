import React,{ useState , useEffect } from "react";
import "./weather.css"

const { kakao } = window;

function Weather(){
const API_KEY1 = "c58c6db3e8115c0388b383caa729f340";
  const [spot, setSpot] = useState()

  const [coords, saveCoords] = useState();
  const [temp, setTemp] = useState();
  const [ids, setIds] = useState();
  const [iconId, setIconId] = useState();
  const [weather, setWeather] = useState();
  const [hum, setHum] = useState();

  const [co, setCo] = useState()
  const [no, setNo] = useState()
  const [no2, setNo2] = useState()
  const [o3, setO3] = useState()
  const [so2, setSo2] = useState()
  const [pm2_5, setPm2_5] = useState()
  const [pm10, setPm10] = useState()
  const [nh3, setNh3] = useState()  

   
  useEffect(() => {
    requestCoords();
    //getCity()
  }, []);
  
   function handleGeoSucc(position) {
    const latitude = position.coords.latitude   // 경도  
    const longitude = position.coords.longitude  ;  // 위도
    const coordsObj = {
      latitude,
      longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    getDust(latitude, longitude);
    //getCity(latitude, longitude)
  }

  function handleGeoErr(err) {
    console.log("geo err! " + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY1}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const id = data.weather[0].id
        const temp = data.main.temp.toFixed(1);
        const weathers = data.weather[data.weather.length - 1];
        const hum = data.main.humidity
        const icon= data.weather[0].icon
        const img_url = `http://openweathermap.org/img/w/${icon}.png`;
        setTemp(temp);
        setWeather(weathers.main);
        setHum(hum)
        setIds(img_url)
      })
    }

  function getDust(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY1}`)
      .then(res => res.json())
      .then(data => {
        const co = data.list[0].components.co// CO (일산화탄소)의 집중 농도, μg / m3
        const no = data.list[0].components.no//NO (일산화질소)의 집중 작용, μg / m3
        const no2 = data.list[0].components.no2//NO (이산화질소)의 집중 작용, μg / m3
        const o3 = data.list[0].components.o3// O의 집중3 (오존), μg / m3
        const so2 = data.list[0].components.so2//SO의 집중2 (이산화황), μg / m3
        const pm2_5 = data.list[0].components.pm2_5// PM의 집중2.5 (미세 입자 물질), μg/m3
        const pm10 = data.list[0].components.pm10//PM의 집중10 (거친 입자상 물질), μg/m3
        const nh3 = data.list[0].components.nh3// NH의 집중3 (암모니아), μg / m3
        setCo(co)
        setNo(no)
        setNo2(no2) 
        setO3(o3)
        setSo2(so2) 
        setPm2_5(pm2_5)
        setPm10(pm10)
        setNh3(nh3) 
      })
    
  }
  // function getCity(lat, lon){
  //     let geocoder = new kakao.maps.services.Geocoder();
  //     let coord = new kakao.maps.LatLng(lat, lon);
  //     let callback = function(result, status) {
  //         if (status === kakao.maps.services.Status.OK) {
  //           const spot = result[0].address.address_name
  //           setSpot(spot)
  //         }
        
        
  //     }
  //     geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  // }


  
  return (
        <div className="detailweather">
          <div className="temp_box">
              <h1 className="temperature">{temp}&deg;</h1>
              <h2 className="description">{weather}</h2>
          </div>
          <div className="detailbox">
            <div className="dbox">
              <p className="dboxt">Humidity</p>
              <p>{hum} %</p>
            </div>
            <div className="dbox">
            <p className="dboxt">Dust</p>
              <p>{pm2_5} ㎍/m³</p>
            </div>
          </div>
            {/* <div className="d_box">
          <div className="weatherData">
            <Today/>
            <h3 className="city">{spot}</h3>
          </div>
          <div className="timebox">
            <Time/>
          </div>
        </div> */}
        </div>
      
   
);
  }

  export default Weather