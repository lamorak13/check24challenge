import { Component, Setter, createSignal } from "solid-js";
import Input from "../../components/form/Input";
import { GameStatus } from "../../utils/types/GameStatus";
import Button from "../../components/form/Button";
import { GameQuery } from "../../utils/types/GameQuery";
import DatePicker from "../../components/form/DatePicker";
import Checkbox from "../../components/form/Checkbox";
import Select from "../../components/form/Select";

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
        <Select
          id='status'
          defaultOption
          defaultOptionText='All'
          value={status()}
          onChange={(value) =>
            setStatus(
              Object.values(GameStatus).includes(value as GameStatus)
                ? (value as GameStatus)
                : ""
            )
          }
          options={[
            { text: "Upcoming", value: GameStatus.UPCOMING },
            { text: "In progress", value: GameStatus.IN_PROGRESS },
            { text: "Finished", value: GameStatus.FINISHED },
          ]}
        />
      </div>

      <div class='flex flex-col justify-between'>
        <label for='date' class='block mb-2 text-silver uppercase text-sm'>
          Kickoff Date
        </label>
        <DatePicker
          id='date'
          value={kickoff()}
          setValue={(value) => setKickoff(value == "" ? "" : new Date(value))}
        />
      </div>

      <div>
        <label for='bet' class='block mb-6 text-silver uppercase text-sm'>
          Only show bets
        </label>
        <Checkbox
          id='bet'
          isChecked={isBetOn()}
          onChange={() => setIsBetOn((b) => !b)}
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
