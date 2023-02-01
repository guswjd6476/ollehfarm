import React,{ useState , useEffect } from "react";

function Time() {

const [clock, setClock] = useState()

//실시간 시간 함수
function GetClock() {
  
  let today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    let seconds = String(today.getSeconds()).padStart(2, "0");
    const clock = `${hours}:${minutes}`;
    setClock(clock)
  }
  setInterval(GetClock, 1000);


useEffect(() => {
  GetClock();
}, []);
  return (
      <div className="times">
          {clock}
      </div>
  );
}

export default Time;