import {
  JSX,
  createContext,
  createSignal,
  Setter,
  Accessor,
  useContext,
} from "solid-js";

type User = {
  name: string;
  points: number;
  registration_date: Date;
};

interface ContextType {
  user: Accessor<User>;
  setUser: Setter<User>;
}

const UserContext = createContext<ContextType>({
  user: () => {
    return { name: "", points: 0, registration_date: new Date() };
  },
  setUser: () => {},
});

export function UserProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createSignal<User>({
    name: "",
    points: 0,
    registration_date: new Date(),
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext)!;
