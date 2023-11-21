import { API_URL } from "./api";

//login
export async function login(email, password) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const APIResponseObject = await response.json();
  return APIResponseObject;
}

//logout
export async function logout(authenticationKey) {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({}),
  });
  const APIResponseObject = await response.json();
  return APIResponseObject;
}

//get all users , why auth KEY?
export async function getAll(authenticationKey) {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.users;
}
//get user by user ID , why auth KEY?
export async function getUserByID(Id, authenticationKey) {
  const response = await fetch(`${API_URL}/users/${Id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.user;
}

export async function getTrainerNameByID(Id, authenticationKey) {
  const response = await fetch(`${API_URL}/users/trainers/${Id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.user;
}

//get user by role
export async function getUserByrole(role, authenticationKey) {
  const response = await fetch(`${API_URL}/users/role/${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.user;
}

// get user by authkey
export async function getByAuthenticationKey(authenticationKey) {
  const response = await fetch(`${API_URL}/users/key/${authenticationKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.user;
}
//Register user
export async function registerUser(user) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const postUserResult = await response.json();

  return postUserResult;
}
//create user
export async function createUser(user, authenticationKey) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({ user }),
  });

  const postUserResult = await response.json();
  return postUserResult;
}
//update user
export async function updateUser(user, authenticationKey) {
  const response = await fetch(`${API_URL}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({ user }),
  });
  const postUserResult = await response.json();
  return postUserResult;
}
//delete user
export async function deleteUser(Id, authenticationKey) {
  const response = await fetch(`${API_URL}/users/${Id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({}),
  });

  const deleteUserResult = await response.json();
  return deleteUserResult;
}
console.log(API_URL);
