import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { addDays } from "date-fns";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

function Calendars(){
  const [value, onChange] = useState(new Date());
  const [lead, setLead] = useContext(AppContext);
  // const d1 = addDays(value, 1);
  // const d2 = addDays(value, 2);
  // const d3 = addDays(value, 3);
  // const d4 = addDays(value, 4);
  const d5 = addDays(value, 5);
  // useEffect(()=>{
  //   setLeadtime(lead.map((item)=>item.machinery))
  // },[lead])
  
  //json에서 특정 key값만 뽑아 내 오는 방법
  console.log("data", lead?.[0]['avg_leadtime'])
  const leadt = lead?.[0]['avg_leadtime']
  const marks = [d5];

  return(
    <>
    <Calendar
        onChange={onChange}
        value={value}
        locale="en-EN"
        tileClassName={({ date, view }) => {
          if (
            marks.find(
              (x) =>
                moment(x).format("DD-MM-YYYY") ===
                moment(date).format("DD-MM-YYYY")
            )
          ) {
            {
            return "highlight";
          }
        }}}
      />
    </>
  );
}

export default Calendars;
