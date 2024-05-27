import { ServerMessage } from "./types/ServerMessage";

const subscribees = new Set<[(s: ServerMessage) => any, ServerMessage[]]>();

export function runSubsriber(type: ServerMessage) {
  subscribees.forEach(([f, types]) => {
    if (types.includes(type)) f(type);
  });
}

function subscribe(f: (s: ServerMessage) => any, on?: ServerMessage[]) {
  subscribees.add([
    f,
    on
      ? on
      : [
          ServerMessage["Game Finished"],
          ServerMessage["Game Started"],
          ServerMessage["Game Score"],
        ],
  ]);
}

function unsubscribe(f: (s: ServerMessage) => any, on?: ServerMessage[]) {
  subscribees.delete([
    f,
    on
      ? on
      : [
          ServerMessage["Game Finished"],
          ServerMessage["Game Started"],
          ServerMessage["Game Score"],
        ],
  ]);
}

export const useRealtimeRefetch = () => [subscribe, unsubscribe];
