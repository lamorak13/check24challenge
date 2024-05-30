type User = {
  name: string;
  points: number;
  registration_date: Date;
};

export async function signInUser(userName: string): Promise<User> {
  const response = await fetch("http://localhost:5000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName }),
  });

  return await response.json();
}

export async function signUpUser(userName: string): Promise<User[]> {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName }),
  });

  return await response.json();
}
