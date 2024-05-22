import { Component, createSignal } from "solid-js";
import HorizontalLine from "../../components/shared/HorizontalLine";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { A, useNavigate } from "@solidjs/router";
import { signUpUser } from "../../utils/api";
import { useUserNameContext } from "../UserNameContext";

const Signup: Component<{}> = (props) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = createSignal("");
  const { setName } = useUserNameContext();

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
          const { name } = await signUpUser(userInput());
          setName(name);
          navigate("/", { replace: true });
        }}
      />
      <p class='text-lg mt-5'>
        Already have an account? <A href='/signin'>Sign in!</A>
      </p>
    </>
  );
};

export default Signup;
