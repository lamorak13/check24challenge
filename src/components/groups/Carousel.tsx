import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";
import { Component, JSX } from "solid-js";

const Carousel: Component<{
  itemWidth: number;
  children: JSX.Element[];
  style?: string;
}> = (props) => {
  let carousel: HTMLDivElement | undefined;

  return (
    <section>
      <div class='flex gap-5 mx-auto w-fit items-center'>
        <button
          onClick={() => (carousel!.scrollLeft -= props.itemWidth)}
          class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
          <RiArrowsArrowDropLeftLine class='text-[50px] text-light-blue' />
        </button>
        <div
          ref={carousel}
          class={`py-10 px-[50px] flex gap-[75px] w-[500px] overflow-x-hidden scroll-smooth snap-mandatory snap-x ${props.style}`}>
          {props.children}
        </div>
        <button
          onClick={() => (carousel!.scrollLeft += props.itemWidth)}
          class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
          <RiArrowsArrowDropRightLine class='text-[50px] text-light-blue ' />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
