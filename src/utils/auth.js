const BASE_URL = "http://localhost:3001";
import { checkResponse } from "./api";

const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse);
};

const checkToken = (token) => {
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

export default { register, login, checkToken };
