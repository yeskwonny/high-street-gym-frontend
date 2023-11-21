import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api/api";
import { useAuthentication } from "../hooks/authentication";
import { Fragment } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import * as Classes from "../api/class";
import * as Users from "../api/user";
function ImportList() {
  const [user] = useAuthentication();
  const authenticationKey = user.authKey;
  const [classList, setClassList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);

  useEffect(() => {
    Classes.getAllClasses().then((classes) => setClassList(classes));
  }, []);

  useEffect(() => {
    Users.getUserByrole("trainer", authenticationKey).then((trainers) =>
      setTrainerList(trainers),
    );
  }, []);
  console.log(classList);
  //   console.log(trainerList);
  return (
    <div className=" text[0.9rem] flex h-screen flex-col    overflow-y-auto bg-slate-950">
      <Header>Import List</Header>
      <div className="mb-6  grid grid-cols-3 place-items-center gap-1  text-[0.8rem] text-slate-50 ">
        <div>Trainer ID</div>
        <div>First name</div>
        <div>Last name</div>
        {trainerList.map((trainer, i) => (
          <Fragment key={i}>
            <div>{trainer.id}</div>
            <div>{trainer.fname}</div>
            <div>{trainer.lname}</div>
          </Fragment>
        ))}
      </div>
      <div className="grid  grid-cols-5 place-items-center gap-1 border-t-[1px] text-[0.8rem] text-slate-50">
        <div className="pt-2">Time</div>
        <div className="pt-2">Location ID</div>
        <div className="pt-2">Activity ID</div>
        <div className="pt-2">Trainer ID</div>
        <div className="pt-2">Day</div>
        {classList.map((result, i) => (
          <Fragment key={i}>
            <div>{result.time.substring(0, 5)}</div>
            <div>{result.locationID}</div>
            <div>{result.activityID}</div>
            <div>{result.trainerID}</div>
            <div>{result.day}</div>
          </Fragment>
        ))}
      </div>
      <Nav />
    </div>
  );
}

export default ImportList;
