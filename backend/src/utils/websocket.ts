import ws from "ws";

const wss = new ws.Server({ port: 8080 });
wss.on("connection", function connection(ws) {
  console.log("new connection");

  ws.on("close", function () {
    console.log("Closing connection..");
  });
});

export function sendGameStartedUpdate() {
  wss.clients.forEach((ws) => ws.send("Game Started"));
}

export function sendGameFinishedUpdate() {
  wss.clients.forEach((ws) => ws.send("Game Finished"));
}

export function sendGameScoredUpdate() {
  wss.clients.forEach((ws) => ws.send("Game Score"));
}
