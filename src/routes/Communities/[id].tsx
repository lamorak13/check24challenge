import { Component } from "solid-js";
import Preview from "../../components/groups/Preview";
import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";

const Community: Component = () => {
  let carousel: HTMLDivElement | undefined;
  const ItemWidth = 300;

  return (
    <section>
      <div class='flex gap-5 mx-auto w-fit items-center'>
        <button
          onClick={() => (carousel!.scrollLeft -= ItemWidth)}
          class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
          <RiArrowsArrowDropLeftLine class='text-[50px] text-light-blue' />
        </button>
        <div
          ref={carousel}
          class='py-10 px-[50px] flex gap-[75px] w-[500px] overflow-x-hidden scroll-smooth snap-mandatory snap-x'>
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
        </div>
        <button
          onClick={() => (carousel!.scrollLeft += ItemWidth)}
          class='border-light-blue border-2 rounded-full hover:bg-light-blue/10'>
          <RiArrowsArrowDropRightLine class='text-[50px] text-light-blue ' />
        </button>
      </div>
    </section>
  );
};

export default Community;
