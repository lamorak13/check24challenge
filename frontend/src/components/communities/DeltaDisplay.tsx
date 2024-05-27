import {
  RiArrowsArrowUpDoubleLine,
  RiWeatherFireLine,
  RiWeatherFlashlightLine,
} from "solid-icons/ri";
import { Component, Match, Switch } from "solid-js";

const DeltaDisplay: Component<{ delta: number }> = (props) => {
  return (
    <Switch fallback={<span>{props.delta}</span>}>
      <Match when={props.delta >= 16}>
        <span class='flex gap-2 items-start text-red font-bold'>
          <span>{props.delta}</span>
          <RiWeatherFireLine size={20} />
        </span>
      </Match>
      <Match when={props.delta >= 12}>
        <span class='flex gap-2 items-start text-yellow font-bold'>
          {props.delta}
          <RiWeatherFlashlightLine size={20} />
        </span>
      </Match>
      <Match when={props.delta >= 8}>
        <span class='flex gap-2 items-center text-green font-bold'>
          {props.delta}
          <RiArrowsArrowUpDoubleLine size={20} />
        </span>
      </Match>
    </Switch>
  );
};

export default DeltaDisplay;
