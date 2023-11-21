import { API_URL } from "./api.js";

export async function getAllClasses() {
  const response = await fetch(`${API_URL}/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.classes;
}

export async function getClassesByDay(day, authenticationKey) {
  const response = await fetch(`${API_URL}/classes/${day}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.classes;
}

export async function getClassesByID(classID, authenticationKey) {
  const response = await fetch(`${API_URL}/classes/id/${classID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.classes;
}

export async function getClassesByDayandName(
  day,
  activityID,
  authenticationKey,
) {
  const response = await fetch(`${API_URL}/classes/${activityID}/${day}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.classes;
}
