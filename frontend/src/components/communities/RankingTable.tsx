import {
  Component,
  For,
  Setter,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";
import Table from "../shared/Table";
import PaginationButtons from "./PaginationButtons";
import RankingTableRow from "./RankingTableRow";
import { fetchCommunityRankingPage } from "../../utils/api/rankings";
import { useRealtimeRefetch } from "../../utils/useRealtimeRefetch";
import Select from "../form/Select";
import { ServerMessage } from "../../utils/types/ServerMessage";

const RankingTable: Component<{
  rankings: UserRanking[];
  handlePinUser: (r: UserRanking) => void;
  mutate: Setter<UserRanking[] | undefined>;
  userName: string;
  communityName: string;
  refetch: (
    info?: unknown
  ) => UserRanking[] | Promise<UserRanking[] | undefined> | null | undefined;
}> = (props) => {
  const userRank = props.rankings.findIndex((r) => r.name == props.userName);
  const [pageSize, setPageSize] = createSignal(10);
  const [upperLimit, setUpperLimit] = createSignal(
    userRank <= 3 ? 3 : userRank
  );
  const [lowerLimit, setLowerLimit] = createSignal(
    userRank <= 3 ? 4 : userRank + 1
  );

  async function reset() {
    await props.refetch();
    const rank = props.rankings.findIndex((r) => r.name == props.userName);
    setUpperLimit(rank <= 3 ? 3 : rank);
    setLowerLimit(rank <= 3 ? 4 : rank + 1);
  }

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(reset, [ServerMessage["Game Finished"]]));
  onCleanup(() => unsubscribe(reset, [ServerMessage["Game Finished"]]));

  async function handlePageRequest(
    from: number,
    to: number,
    setters: Setter<number>[]
  ) {
    const result = await fetchCommunityRankingPage(
      props.communityName,
      from,
      to
    );
    if (result.length <= 0) return;

    const maxRowNum = result.at(-1)!.row_num;
    const insertIndex = props.rankings.findIndex((r) => r.row_num > maxRowNum);
    props.mutate((rankings) => [
      ...rankings!.slice(0, insertIndex),
      ...result,
      ...rankings!.slice(insertIndex),
    ]);
    setters.forEach((s) => s((n) => n + result.length));
  }
  return (
    <div>
      <div class='flex justify-between items-end mb-5'>
        <h2 class='text-3xl'>All Users</h2>
        <div class='flex flex-col justify-between items-end'>
          <label for='status' class='mb-2 text-silver uppercase text-sm'>
            Page Size
          </label>
          <Select
            id='size'
            value={pageSize().toString()}
            options={[
              { text: "10", value: "10" },
              { text: "25", value: "25" },
              { text: "50", value: "50" },
              { text: "100", value: "100" },
            ]}
            defaultOption={false}
            onChange={(n) => setPageSize(Number(n))}
          />
        </div>
      </div>
      <Table
        headings={["Rank", "User", "Points", "Bets", "PpB", "+/-", ""]}
        style='w-[800px]'>
        <For each={props.rankings.slice(0, upperLimit())}>
          {(ranking) => (
            <RankingTableRow
              userName={props.userName}
              ranking={ranking}
              handlePinUser={props.handlePinUser}
            />
          )}
        </For>
        <Show
          when={
            props.rankings.at(upperLimit()) &&
            props.rankings.at(upperLimit() - 1) &&
            props.rankings.at(upperLimit() - 1)!.row_num + 1 <
              props.rankings.at(upperLimit())!.row_num
          }>
          <PaginationButtons
            onDownClick={() =>
              handlePageRequest(
                props.rankings.at(upperLimit() - 1)!.row_num + 1,
                Math.min(
                  props.rankings.at(upperLimit())!.row_num - 1,
                  props.rankings.at(upperLimit() - 1)!.row_num + pageSize()
                ),
                [setUpperLimit, setLowerLimit]
              )
            }
            onUpClick={() =>
              handlePageRequest(
                Math.max(
                  props.rankings.at(upperLimit() - 1)!.row_num + 1,
                  props.rankings.at(upperLimit())!.row_num - pageSize()
                ),
                props.rankings.at(upperLimit())!.row_num - 1,
                [setLowerLimit]
              )
            }
          />
        </Show>

        <For each={props.rankings.slice(upperLimit(), lowerLimit())}>
          {(ranking) => (
            <RankingTableRow
              userName={props.userName}
              ranking={ranking}
              handlePinUser={props.handlePinUser}
            />
          )}
        </For>

        <Show
          when={
            props.rankings.at(lowerLimit()) &&
            props.rankings.at(lowerLimit() - 1) &&
            props.rankings.at(lowerLimit() - 1)!.row_num + 1 <
              props.rankings.at(lowerLimit())!.row_num
          }>
          <PaginationButtons
            onDownClick={() =>
              handlePageRequest(
                props.rankings.at(lowerLimit() - 1)!.row_num + 1,
                Math.min(
                  props.rankings.at(lowerLimit())!.row_num - 1,
                  props.rankings.at(lowerLimit() - 1)!.row_num + pageSize()
                ),
                [setLowerLimit]
              )
            }
            onUpClick={() =>
              handlePageRequest(
                Math.max(
                  props.rankings.at(lowerLimit() - 1)!.row_num + 1,
                  props.rankings.at(lowerLimit())!.row_num - pageSize()
                ),
                props.rankings.at(lowerLimit())!.row_num - 1,
                []
              )
            }
          />
        </Show>

        <For each={props.rankings.slice(lowerLimit())}>
          {(ranking) => (
            <RankingTableRow
              userName={props.userName}
              ranking={ranking}
              handlePinUser={props.handlePinUser}
            />
          )}
        </For>
      </Table>
    </div>
  );
};

export default RankingTable;
