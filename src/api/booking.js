import { API_URL } from "./api";

export async function createBooking(booking, authenticationKey) {
  const response = await fetch(`${API_URL}/bookinglist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify(booking),
  });

  const postUserResult = await response.json();
  return postUserResult;
}

export async function getBookingsByID(userID, authenticationKey) {
  const response = await fetch(`${API_URL}/bookinglist/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.bookings;
}
export async function deleteBookingByID(bookingId, authenticationKey) {
  const response = await fetch(
    `${API_URL}/bookinglist/cancellations/${bookingId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    },
  );

  const APIResponseObject = await response.json();
  return APIResponseObject;
}
