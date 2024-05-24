import { Component, For, Show } from "solid-js";

const Select: Component<{
  value: string;
  options: { text: string; value: string }[];
  defaultOption: boolean;
  defaultOptionText?: string;
  onChange: (s: string) => void;
  id: string;
}> = (props) => {
  return (
    <select
      id='status'
      class=' bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white flex-grow'
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}>
      <Show when={props.defaultOption}>
        <option value={""} class='bg-black'>
          {props.defaultOptionText}
        </option>
      </Show>
      <For each={props.options}>
        {(option) => (
          <option value={option.value} class='bg-black'>
            {option.text}
          </option>
        )}
      </For>
    </select>
  );
};

export default Select;
