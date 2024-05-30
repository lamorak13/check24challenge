import { A, useNavigate } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import HorizontalLine from "../../components/shared/HorizontalLine";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import { signInUser } from "../../utils/api/auth";
import { useUserContext } from "../UserNameContext";

const Signin: Component<{}> = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = createSignal("");
  const { setUser } = useUserContext();

  return (
    <>
      <h1 class='text-center'>Sign in to your Account</h1>
      <HorizontalLine />
      <Input
        placeholder={"Your name ..."}
        value={userInput()}
        onInput={setUserInput}
      />
      <Button
        text='Sign in'
        onClick={async () => {
          const user = await signInUser(userInput());
          if (user) {
            setUser(user);
            navigate("/", { replace: true });
          }
        }}
      />
      <p class='text-lg mt-5'>
        Dont have an account yet? <A href='/signup'>Sign up!</A>
      </p>
    </>
  );
};

export default Signin;
