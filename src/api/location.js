import { API_URL } from "./api.js";

export async function getLocationByID(locationID, authenticationKey) {
  try {
    // GET from the API /location/:locationID
    const response = await fetch(`${API_URL}/location/${locationID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    });

    const APIResponseObject = await response.json();

    return APIResponseObject.location;
  } catch (error) {
    throw new Error(`Error fetching location: ${error.message}`);
  }
}
