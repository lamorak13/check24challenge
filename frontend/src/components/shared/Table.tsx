import { Component, For, JSX } from "solid-js";

const Table: Component<{
  headings: string[];
  children: JSX.Element;
  style?: string;
}> = (props) => {
  return (
    <table class={`custom-gradient rounded-sm ${props.style}`}>
      <thead class='text-left bg-black uppercase tracking-widest text-silver '>
        <tr>
          <For each={props.headings}>
            {(heading) => <th class='px-4 py-3 font-semibold'>{heading}</th>}
          </For>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};

export default Table;
