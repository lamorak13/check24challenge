import {
  JSX,
  createContext,
  createSignal,
  Setter,
  Accessor,
  useContext,
} from "solid-js";

interface ContextType {
  name: Accessor<string | undefined>;
  setName: Setter<string | undefined>;
}

const UserNameContext = createContext<ContextType>();

export function UserNameProvider(props: { children: JSX.Element }) {
  const [name, setName] = createSignal<string | undefined>(undefined);

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
