import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";
import { Component, JSX, Show } from "solid-js";
import CarouselButton from "./CarouselButton";

const Carousel: Component<{
  itemWidth: number;
  children: JSX.Element[] | JSX.Element;
  style?: string;
  buttonSize?: number;
  buttonPosition?: "Botton" | "Side";
}> = (props) => {
  let carousel: HTMLDivElement | undefined;

  return (
    <>
      <div class='flex w-fit items-center'>
        <Show when={!props.buttonPosition || props.buttonPosition == "Side"}>
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft -= props.itemWidth)}
            Icon={RiArrowsArrowDropLeftLine}
          />
        </Show>

        <div
          ref={carousel}
          class={`px-[50px] flex items-stretch gap-[75px] w-[500px] overflow-x-hidden scroll-smooth snap-mandatory snap-x ${props.style}`}>
          {props.children}
        </div>

        <Show when={!props.buttonPosition || props.buttonPosition == "Side"}>
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft += props.itemWidth)}
            Icon={RiArrowsArrowDropRightLine}
          />
        </Show>
      </div>

      <Show when={props.buttonPosition == "Botton"}>
        <div class='flex justify-center gap-8 mt-5'>
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft -= props.itemWidth)}
            Icon={RiArrowsArrowDropLeftLine}
          />
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft += props.itemWidth)}
            Icon={RiArrowsArrowDropRightLine}
          />
        </div>
      </Show>
    </>
  );
};

export default Carousel;
