import { ServerMessage } from "./types/ServerMessage";

const subscribees = new Set<(s: ServerMessage) => any>();

export function runSubsriber(type: ServerMessage) {
  subscribees.forEach((f) => {
    f(type);
  });
}

function subscribe(f: (s: ServerMessage) => any) {
  subscribees.add(f);
}

function unsubscribe(f: (s: ServerMessage) => any) {
  subscribees.delete(f);
}

export const useRealtimeRefetch = () => [subscribe, unsubscribe];
