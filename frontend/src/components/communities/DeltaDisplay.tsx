import {
  RiArrowsArrowUpDoubleLine,
  RiWeatherFireLine,
  RiWeatherFlashlightLine,
} from "solid-icons/ri";
import { Component, Match, Switch } from "solid-js";

const DeltaDisplay: Component<{ delta: number }> = (props) => {
  return (
    <Switch fallback={<span>-</span>}>
      <Match when={props.delta >= 12}>
        <span class='flex gap-2 items-start text-red font-bold'>
          + {props.delta}
          <RiWeatherFireLine size={20} />
        </span>
      </Match>
      <Match when={props.delta >= 8}>
        <span class='flex gap-2 items-start text-yellow font-bold'>
          + {props.delta}
          <RiWeatherFlashlightLine size={20} />
        </span>
      </Match>
      <Match when={props.delta >= 6}>
        <span class='flex gap-2 items-center text-green font-bold'>
          + {props.delta}
          <RiArrowsArrowUpDoubleLine size={20} />
        </span>
      </Match>
      <Match when={props.delta > 0}>
        <span class='flex gap-2 items-center text-beige'>+ {props.delta}</span>
      </Match>
    </Switch>
  );
};

export default DeltaDisplay;
