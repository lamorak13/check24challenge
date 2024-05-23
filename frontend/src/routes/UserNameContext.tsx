import {
  JSX,
  createContext,
  createSignal,
  Setter,
  Accessor,
  useContext,
} from "solid-js";

interface ContextType {
  name: Accessor<string>;
  setName: Setter<string>;
}

const UserNameContext = createContext<ContextType>({
  name: () => "",
  setName: () => {},
});

export function UserNameProvider(props: { children: JSX.Element }) {
  const [name, setName] = createSignal<string>("");

  return (
    <UserNameContext.Provider
      value={{
        name,
        setName,
      }}>
      {props.children}
    </UserNameContext.Provider>
  );
}

export const useUserNameContext = () => useContext(UserNameContext)!;
