import { Component, Setter, createSignal } from "solid-js";
import Input from "../../components/form/Input";
import { GameStatus } from "../../utils/types/GameStatus";
import Button from "../../components/form/Button";
import { GameQuery } from "../../utils/types/GameQuery";

const SearchForGames: Component<{ setQuery: Setter<GameQuery> }> = (props) => {
  const [kickoff, setKickoff] = createSignal<Date | "">("");
  const [team, setTeam] = createSignal<string>("");
  const [isBetOn, setIsBetOn] = createSignal<boolean>(false);
  const [status, setStatus] = createSignal<GameStatus | "">("");

  return (
    <div class='flex gap-5 mb-10 w-fit'>
      <div class='flex flex-col justify-between'>
        <label for='team' class='mb-2 text-silver uppercase text-sm'>
          Search for Team
        </label>
        <Input
          id='team'
          value={team()}
          onInput={setTeam}
          placeholder='Your team'
          style='flex-grow'
        />
      </div>

      <div class='flex flex-col justify-between'>
        <label for='status' class='mb-2 text-silver uppercase text-sm'>
          Game Status
        </label>
        <select
          id='status'
          name='status'
          class=' bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white flex-grow'
          value={status()}
          onChange={(e) =>
            setStatus(
              Object.values(GameStatus).includes(e.target.value as GameStatus)
                ? (e.target.value as GameStatus)
                : ""
            )
          }>
          <option value={""} class='bg-black'>
            All
          </option>
          <option value={GameStatus.UPCOMING} class='bg-black'>
            Upcoming
          </option>
          <option value={GameStatus.IN_PROGRESS} class='bg-black'>
            In progress
          </option>
          <option value={GameStatus.FINISHED} class='bg-black'>
            Finished
          </option>
        </select>
      </div>

      <div class='flex flex-col justify-between'>
        <label for='date' class='block mb-2 text-silver uppercase text-sm'>
          Kickoff Date
        </label>
        <input
          id='date'
          type='date'
          value={
            kickoff() == ""
              ? ""
              : (kickoff() as Date).toISOString().split("T")[0]
          }
          onChange={(e) =>
            setKickoff(e.target.value == "" ? "" : new Date(e.target.value))
          }
          class=' bg-white/10 border-beige/10 border-2 rounded-base py-3 px-5 placeholder-white flex-grow'
        />
      </div>

      <div>
        <label for='team' class='block mb-6 text-silver uppercase text-sm'>
          Only show bets
        </label>
        <input
          id='bet'
          type='checkbox'
          checked={isBetOn()}
          onClick={() => setIsBetOn((b) => !b)}
          class='w-[20px] aspect-square'
        />
      </div>
      <Button
        text='Filter Games'
        style='mt-auto'
        onClick={() =>
          props.setQuery({
            kickoff: kickoff(),
            team: team(),
            bet: isBetOn(),
            status: status(),
          })
        }
      />
    </div>
  );
};

export default SearchForGames;
