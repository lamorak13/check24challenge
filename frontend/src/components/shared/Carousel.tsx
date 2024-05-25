import {
  RiArrowsArrowDropLeftLine,
  RiArrowsArrowDropRightLine,
} from "solid-icons/ri";
import { Component, JSX, Show, onCleanup, onMount } from "solid-js";
import CarouselButton from "./CarouselButton";

const Carousel: Component<{
  itemWidth: number;
  children: JSX.Element[] | JSX.Element;
  buttonPosition: "Bottom" | "Side";
  moving?: boolean;
  style?: string;
  buttonSize?: number;
  id?: string;
}> = (props) => {
  let carousel: HTMLDivElement | undefined;

  onMount(() => {
    if (props.moving) {
      const t = setInterval(() => {
        if (carousel) {
          if (
            carousel.scrollLeft + 1.5 * props.itemWidth >=
            carousel.scrollWidth
          ) {
            carousel.scrollLeft -= carousel.scrollLeft;
          } else {
            carousel.scrollLeft += props.itemWidth;
          }
        }
      }, 5000);

      onCleanup(() => clearInterval(t));
    }
  });

  return (
    <>
      <div class='flex w-fit items-center'>
        <Show when={props.buttonPosition == "Side"}>
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft -= props.itemWidth)}
            Icon={RiArrowsArrowDropLeftLine}
          />
        </Show>

        <div
          style={`width: ${props.itemWidth}px`}
          id={props.id}
          ref={carousel}
          class={`px-[50px] flex items-stretch gap-[75px] w-[500px] overflow-x-hidden scroll-smooth snap-mandatory snap-x ${props.style}`}>
          {props.children}
        </div>

        <Show when={props.buttonPosition == "Side"}>
          <CarouselButton
            buttonSize={props.buttonSize}
            onClick={() => (carousel!.scrollLeft += props.itemWidth)}
            Icon={RiArrowsArrowDropRightLine}
          />
        </Show>
      </div>

      <Show when={props.buttonPosition == "Bottom"}>
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
