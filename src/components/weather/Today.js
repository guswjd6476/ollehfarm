import React,{ useState , useEffect } from "react";

function Today() {

const [clock, setClock] = useState()
const [todays, setTodays] = useState();
const [realmonth, setRealMonth] = useState();


function getToday(){
  const d = new Date();
  const day = d.getDate()

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const months =  month[d.getMonth()]
  setRealMonth(months)
  setTodays(day)
}

useEffect(() => {
  getToday();
}, []);
  return (
      <div>
        <div className="months">
          {realmonth} {todays}일
        </div>
        <div className="days" id="day">
          
        </div>
      </div>
  );
}

export default Today;