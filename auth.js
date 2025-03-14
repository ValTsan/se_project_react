const API_URL = "http://localhost:3001";

const register = (name, avatar, email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to register");
    }
    return response.json();
  });
};

const login = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    return response.json();
  });
};

const checkToken = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Invalid token");
    }
    return response.json();
  });
};

export default { register, login, checkToken };
