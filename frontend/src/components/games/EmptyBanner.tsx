import { Component } from "solid-js";

const EmptyBanner: Component<{}> = () => {
  return (
    <div class='custom-gradient flex justify-between items-center px-4 py-2 flex-shrink-0 snap-center w-[600px]'>
      <h3 class='text-silver'>No games are currently played</h3>
    </div>
  );
};

export default EmptyBanner;
