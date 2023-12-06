import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";

import Header from "../components/Header";
import Nav from "../components/Nav";
import * as Classes from "../api/class";
import Spinner from "../components/Spinner";

// when timetable is loading, loading spinner

function Timetable() {
  const [user] = useAuthentication();
  const authenticationKey = user.authKey;
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeks, setWeeks] = useState([]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    async function getTimetable() {
      try {
        const finalTimetable = await getNewWeek();
        setWeeks(finalTimetable);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      } // Set the data to state
    }
    getTimetable();
  }, []);

  async function getNewWeek() {
    const weekForTimetable = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(currentDate); // copy of current Date.
      nextDay.setDate(currentDate.getDate() + i);
      const daysForTimetable = days[nextDay.getDay()]; //0=Sunday

      //access data out of promise
      const classes = await Classes.getClassesByDay(
        daysForTimetable,
        authenticationKey,
      ).then((result) => result);

      weekForTimetable.push({
        date: nextDay,
        daysForTimetable,
        classes,
      });
    }
    // console.log(weekForTimetable);
    return weekForTimetable;
  }

  function handleOnClick(selectedClass, id) {
    navigate(`/booking/${id}`, { state: { selectedClass } });
  }

  return weeks && user ? (
    <div className=" relative h-screen overflow-y-auto bg-slate-950">
      <Header>Timetable</Header>
      <form className="  m-auto flex h-4/6 w-3/4 flex-col gap-3 overflow-y-auto">
        {weeks.map((day, index) => {
          return (
            <div key={index} className="mt-6 text-stone-50">
              <h2 className="border-b-2 border-t-2 text-center text-lg">
                {day.daysForTimetable}, {day.date.toLocaleDateString()}
              </h2>
              {!day.classes
                ? "No class"
                : day.classes.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className={"ml-1"}>{result.activity_name}</span>
                      </div>
                      <button
                        value={result.activity_id}
                        className={
                          "btn btn-xs m-2 bg-[#ff9c82] font-light tracking-wider text-black hover:bg-slate-50"
                        }
                        onClick={() => handleOnClick(day, result.activity_id)}
                      >
                        Book
                      </button>
                    </div>
                  ))}
            </div>
          );
        })}
      </form>
      <Nav />
    </div>
  ) : (
    <Spinner />
  );
}

export default Timetable;
