export async function signInUser(username: string) {
  const response = await fetch("http://localhost:5000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username }),
  });

  const result = await response.json();
  return result;
}

export async function signUpUser(username: string) {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username }),
  });

  const result = await response.json();
  return result;
}
