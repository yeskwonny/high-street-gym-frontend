import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/authentication";

import Button from "../components/Button";
import Header from "../components/Header";
import Nav from "../components/Nav";

import * as Classes from "../api/class";
import * as Users from "../api/user";
import * as Location from "../api/location";
import * as Activity from "../api/activity";
import * as Bookings from "../api/booking";
import Spinner from "../components/Spinner";

// todo: bookinglist is loading, loading spinner
function BookingList() {
  const [user] = useAuthentication();
  const [bookedList, setBookedList] = useState([]);
  const [status, setStatus] = useState("");
  const authenticationKey = user.authKey;
  const userID = user.id;

  // make function getList() seperately and use in use Effect and use

  async function getBookingList(userID, authenticationKey) {
    const lists = await Bookings.getBookingsByID(
      userID,
      authenticationKey,
    ).then(async (results) => {
      if (!results) {
        setBookedList([]);
        setStatus("No bookings");
        return;
      }

      const bookingLists = await Promise.all(
        results.map(async (result) => {
          const classID = result.class_id;
          const classDate = result.classDate;
          const bookingID = result.id;
          const bookedClassInfo = await Classes.getClassesByID(
            classID,
            authenticationKey,
          );

          //activity
          const bookedActivityInfo = await Activity.getactivityByID(
            bookedClassInfo.class_activity_id,
            authenticationKey,
          );

          //location
          const bookedLocationInfo = await Location.getLocationByID(
            bookedClassInfo.class_location_id,
            authenticationKey,
          );
          //trainer
          const bookedTrainerInfo = await Users.getUserByID(
            bookedClassInfo.class_trainer_user_id,
            authenticationKey,
          );

          return Promise.resolve({
            bookingID: bookingID,
            trainerName: bookedTrainerInfo.fname,
            trainerId: bookedTrainerInfo.id,
            classTime: bookedClassInfo.class_time.toString(),
            classDate: classDate,
            classDay: bookedClassInfo.class_day,
            location: bookedLocationInfo.name,
            activity: bookedActivityInfo.name,
          });
        }),
      );
      setBookedList(bookingLists);
    });
  }

  useEffect(() => {
    getBookingList(userID, authenticationKey);
  }, [userID, authenticationKey]);

  async function handleonCancel(e) {
    e.preventDefault();
    const deleteID = e.target.value;
    const deleteBooking = await Bookings.deleteBookingByID(
      deleteID,
      authenticationKey,
    );
    getBookingList(userID, authenticationKey);
    setStatus(deleteBooking.message);
  }

  return bookedList && user ? (
    <div className=" h-screen overflow-y-auto bg-slate-950 text-sm">
      <Header>Booking List</Header>
      {bookedList.map((list, index) => {
        return (
          <div
            key={index}
            className="mb-3 border-b-2 border-dotted border-gray-200  text-neutral-100"
          >
            <h3 className="text-center">
              {list.classDay} {list.classDate}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span>{list.classTime.substring(0, 5)}</span>
              <span>{list.location}</span>
              <span>{list.activity}</span>
              <span>w/ {list.trainerName}</span>
              <button
                value={list.bookingID}
                className={
                  "btn btn-xs m-2 bg-[#ff9c82] font-light tracking-wider"
                }
                onClick={(e) => handleonCancel(e)}
              >
                CANCEL
              </button>
            </div>
          </div>
        );
      })}
      {/* <p className="text-center text-[#ff9c82]">{status}</p> */}

      <Nav />
    </div>
  ) : (
    <Spinner />
  );
}

export default BookingList;
