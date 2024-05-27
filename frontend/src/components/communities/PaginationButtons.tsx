import { IoChevronDownOutline, IoChevronUpOutline } from "solid-icons/io";
import { Component } from "solid-js";

const PaginationButtons: Component<{
  onUpClick: () => void;
  onDownClick: () => void;
}> = (props) => {
  return (
    <>
      <tr class='border-b border-silver/10'>
        <td
          colSpan={6}
          class='pl-4 py-4 text-center'
          onClick={props.onDownClick}>
          Show more
          <IoChevronDownOutline class='inline-block ml-2 text-xl' />
        </td>
      </tr>
      <tr class='border-b border-silver/10'>
        <td colSpan={6} class='pl-4 py-4 text-center' onClick={props.onUpClick}>
          Show more
          <IoChevronUpOutline class='inline-block ml-2 text-xl' />
        </td>
      </tr>
    </>
  );
};

export default PaginationButtons;
