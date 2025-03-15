const BASE_URL = "http://localhost:3001";
import { checkResponse } from "./api";

export const register = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
  // => {
  //   if (!checkResponse.ok) {
  //     throw new Error("Failed to register");
  //   }
  //   return checkResponse.json();
  // });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
  // => {
  //   if (!response.ok) {
  //     throw new Error("Failed to log in");
  //   }
  //   return response.json();
  // });
};

export const checkToken = (token) => {
  if (!token) {
    return Promise.reject(new Error("Token is missing"));
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
