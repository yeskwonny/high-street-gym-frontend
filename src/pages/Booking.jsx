import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Nav from "../components/Nav";

import * as Classes from "../api/class";
import * as Users from "../api/user";
import * as Location from "../api/location";
import * as Activity from "../api/activity";
import * as Bookings from "../api/booking";

function Booking() {
  const [user] = useAuthentication();
  const userID = user.id.toString();
  const authenticationKey = user.authKey;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // useLocation and get info from timetable page
  const selectedClass = location.state?.selectedClass;

  // get Class info that user selected
  const bookedClass = selectedClass.classes.filter((value, index, array) => {
    return value.class_activity_id == id;
  });

  //make the object which includes selected class
  const [bookingClass, setBookingClass] = useState({
    date: selectedClass.date.toLocaleDateString("en-AU"),
    day: selectedClass.daysForTimetable,
    classes: bookedClass[0],
  });

  const [status, setStatus] = useState("");
  // all information for the booking page
  const [classList, setClassList] = useState([]);

  // list of location, time, trainer for mapping
  const [locationList, setLocationList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);

  //final class option that goes to the create booking argument
  const [finalClass, setFinalClass] = useState({
    locationId: "",
    userID: userID,
    location: "",
    time: "",
    trainer: "",
    createdTime: "",
    classDate: bookingClass.date,
    classDay: bookingClass.day,
    classID: "",
  });

  // make classList
  useEffect(() => {
    Classes.getClassesByDayandName(
      bookingClass.day,
      bookingClass.classes.activity_id,
      authenticationKey,
    ).then(async (results) => {
      // console.log(results);
      const selectedList = await Promise.all(
        results.map(async (result) => {
          const location = await Location.getLocationByID(
            result.class_location_id,
            authenticationKey,
          );
          const trainers = await Users.getTrainerNameByID(
            result.class_trainer_user_id,
            authenticationKey,
          );
          const activity = await Activity.getactivityByID(
            result.activity_id,
            authenticationKey,
          );
          const time = result.class_time;
          const classId = result.class_id;

          return Promise.resolve({
            location: location,
            trainers: trainers,
            activity: activity,
            classTime: time,
            classId: classId,
          });
        }),
      );
      console.log(typeof classTime);
      setClassList(selectedList);
    });
  }, [bookingClass]);

  // location list using findIndex and get unique location name
  useEffect(() => {
    if (classList && classList.length > 0) {
      const locationList = classList.map((list, index) => ({
        id: list.location.id,
        location: list.location.name,
        classID: list.classId,
      }));
      const uniqueLocation = locationList.filter((locationList, index, arr) => {
        return (
          index ===
          arr.findIndex(
            (item) =>
              item.id === locationList.id &&
              item.location === locationList.location,
          )
        );
      });
      setLocationList(uniqueLocation);
    }
  }, [classList]);

  // get time list depends on what location user choose
  useEffect(() => {
    if (finalClass && classList) {
      const validTime = classList.filter((list) => {
        return list.location && list.location.id == finalClass.locationId;
      });
      // console.log(validTime);
      setTimeList(validTime);
    }
  }, [finalClass.locationId, classList]);

  // get time list depends on what location &time user choose
  useEffect(() => {
    if (classList && classList.length > 0 && timeList) {
      const validTrainers = classList.filter((list) => {
        // console.log(list);
        return (
          list.location &&
          list.location.id == finalClass.locationId &&
          list.classTime == finalClass.time
        );
      });
      // console.log(validTrainers);
      setTrainerList(validTrainers);
    }
  }, [finalClass, classList]);

  useEffect(() => {
    function createClassBooking() {
      if (finalClass && finalClass.createdTime && authenticationKey) {
        Bookings.createBooking(finalClass, authenticationKey).then((result) => {
          if (result.status === 200) {
            setStatus(result.message);
            setFinalClass({
              locationId: "",
              userID: userID,
              location: "",
              time: "",
              trainer: "",
              createdTime: "",
              classDate: result.date,
              classDay: result.day,
              classID: "",
            });
            setTimeout(() => {
              navigate("/bookinglist");
            }, 800);
          }
        });
      }
    }
    createClassBooking();
  }, [finalClass.createdTime, authenticationKey]);

  function handleLocationChange(e) {
    setFinalClass((prev) => ({
      ...prev,
      locationId: e.target.value,
      location: e.target.options[e.target.selectedIndex].innerText,
      time: "",
      trainer: "",
      classID: "",
    }));
  }

  function handleTimeChange(e) {
    setFinalClass((prev) => ({
      ...prev,
      time: e.target.value,
      trainer: "",
      classID: "",
    }));
  }

  function handleTrainerChange(e) {
    setFinalClass((prev) => ({
      ...prev,
      trainer: e.target.options[e.target.selectedIndex].innerText,
      classID: e.target.value,
    }));
  }

  async function handleOnBooking(e) {
    e.preventDefault();
    const newCreateDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (newCreateDate) {
      setFinalClass((prev) => ({
        ...prev,
        createdTime: newCreateDate,
      }));
    }
  }
  // console.log(finalClass);
  return (
    <div className=" flex h-screen flex-col overflow-y-auto bg-slate-950">
      <Header>Booking</Header>
      <img
        src="/signup_img1.jpg"
        alt="image for booking"
        loading="lazy"
        style={{ width: "100vw", height: "30%", objectFit: "cover" }}
      />
      <div className="form-control mb-3  items-center tracking-wider text-neutral-100">
        <div className=" flex-col items-center">
          <p className="my-5 text-center text-[#ff9c82]">
            {bookingClass.classes.activity_name} (
            {bookingClass.classes.activity_duration})
          </p>
          <p className="text-center text-[0.8rem] text-[#ff9c82]">
            {bookingClass.day} {bookingClass.date}
          </p>
          <p className="text-center text-[0.7rem]">
            {bookingClass.classes.activity_description}
          </p>
        </div>
      </div>

      <form className="form-control mt-5 w-full items-center gap-2">
        <select
          className="select select-bordered select-sm w-full max-w-xs  rounded-sm"
          onChange={handleLocationChange}
          value={finalClass.locationId}
        >
          <option disabled value="">
            Location
          </option>
          {locationList
            ? locationList.map((result, index) => (
                <option key={index} value={result.id} id={result.location}>
                  {result.location}
                </option>
              ))
            : ""}
        </select>
        <select
          className="select select-bordered select-sm w-full max-w-xs rounded-sm"
          onChange={handleTimeChange}
          value={finalClass.time}
        >
          <option disabled value="">
            Time
          </option>
          {finalClass.locationId &&
            timeList.map((result, index) => (
              <option
                key={index}
                value={result.classTime}
                id={result.classtime}
              >
                {result.classTime}
              </option>
            ))}
        </select>

        <select
          className="select select-bordered select-sm w-full max-w-xs rounded-sm"
          onChange={handleTrainerChange}
          value={finalClass.classID}
        >
          <option disabled value="">
            Trainers
          </option>
          {finalClass.time &&
            trainerList.map((result, index) => (
              <option
                key={index}
                value={result.classId}
                id={result.trainers.fname}
              >
                {result.trainers.fname}
              </option>
            ))}
        </select>
        <span className="text-[0.8rem] text-[#ff9c82]">{status}</span>
        <button
          type="submit"
          className={"w-35 btn btn-outline mt-2 bg-[#ff9c82]"}
          onClick={handleOnBooking}
        >
          BOOK
        </button>
      </form>

      <Nav />
    </div>
  );
}

export default Booking;
