import { Component, createSignal } from "solid-js";
import HorizontalLine from "../../components/shared/HorizontalLine";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { A, useNavigate } from "@solidjs/router";
import { signUpUser } from "../../utils/api/auth";
import { useUserContext } from "../UserNameContext";

const Signup: Component<{}> = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = createSignal("");
  const { setUser } = useUserContext();

  return (
    <>
      <h1 class='text-center'>Create your Account</h1>
      <HorizontalLine />
      <Input
        placeholder={"Your username"}
        value={userInput()}
        onInput={setUserInput}
      />
      <Button
        text='Create account'
        onClick={async () => {
          const users = await signUpUser(userInput());
          if (users && users.length > 0) {
            setUser(users[0]);
            navigate("/", { replace: true });
          }
        }}
      />
      <p class='text-lg mt-5'>
        Already have an account? <A href='/signin'>Sign in!</A>
      </p>
    </>
  );
};

export default Signup;
