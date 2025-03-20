const BASE_URL = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${BASE_URL}/items`);
}

function addItem(item) {
  const token = localStorage.getItem("jwt");

  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    }),
  });
}

function updateCurrentUser({ name, avatar }) {
  const token = localStorage.getItem("jwt");

  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

function addCardLike(id) {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id) {
  const token = localStorage.getItem("jwt");
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteItem(id) {
  console.log("Deleting item with ID:", id);
  const token = localStorage.getItem("jwt");

  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  updateCurrentUser,
  checkResponse,
  addCardLike,
  removeCardLike,
};
