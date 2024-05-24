export async function pinUser(
  userName: string,
  pinnedUserName: string,
  communityName: string
) {
  const response = await fetch(`http://localhost:5000/user/${userName}/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ communityName, pinnedUserName }),
  });

  return await response.json();
}

export async function deletePin(
  userName: string,
  pinnedUserName: string,
  communityName: string
) {
  const response = await fetch(`http://localhost:5000/user/${userName}/pin`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ communityName, pinnedUserName }),
  });

  return await response.json();
}

export async function togglePin(
  userName: string,
  pinnedUserName: string,
  communityName: string
) {
  const response = await fetch(`http://localhost:5000/user/${userName}/pin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ communityName, pinnedUserName }),
  });

  return await response.json();
}
