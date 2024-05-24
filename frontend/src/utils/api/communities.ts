export async function createCommunity(userName: string, communityName: string) {
  const response = await fetch(`http://localhost:5000/communities/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": userName,
    },
    body: JSON.stringify({ communityName }),
  });

  return await response.json();
}

export async function joinCommunity(userName: string, communityName: string) {
  const response = await fetch(
    `http://localhost:5000/communities/${communityName}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": userName,
      },
    }
  );

  return await response.json();
}
