const response = await fetch(
  id ? `${API_URL}/${id}` : API_URL,
  {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  }
);

const responseText = await response.text();

console.log("Status:", response.status);
console.log("Response:", responseText);

if (!responseText) {
  throw new Error(`Server returned an empty response. Status: ${response.status}`);
}

const result = JSON.parse(responseText);

if (!response.ok) {
  throw new Error(result.message || "Request failed");
}

navigate("/");