const baseUrl = "http://localhost:3001";

async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

export { getItems };
