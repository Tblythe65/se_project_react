const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

async function request(url, headerInfo) {
  return fetch(url, headerInfo).then(checkResponse);
}

async function getItems() {
  return request(`${baseUrl}/items`, { method: "GET" });
}

async function addItems({ name, imageUrl, weather, token }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

async function deleteCard(_id, token) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    authorization: `Bearer ${token}`,
  });
}

export { getItems, addItems, deleteCard, request, baseUrl };
