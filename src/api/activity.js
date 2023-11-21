import { API_URL } from "./api.js";

export async function getactivityByID(activityID, authenticationKey) {
  try {
    const response = await fetch(`${API_URL}/activity/${activityID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    });

    const APIResponseObject = await response.json();

    return APIResponseObject.activity;
  } catch (error) {
    throw new Error(`Error fetching activity: ${error.message}`);
  }
}
