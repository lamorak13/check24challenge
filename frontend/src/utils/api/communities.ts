export async function createCommunity(username: string, communitName: string) {
  const response = await fetch(`http://localhost:5000/communities/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": username,
    },
    body: JSON.stringify({ communitName }),
  });

  const result = await response.json();
  return result;
}

export async function joinCommunity(username: string, communitName: string) {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": username,
      },
    }
  );

  const result = await response.json();
  return result;
}
