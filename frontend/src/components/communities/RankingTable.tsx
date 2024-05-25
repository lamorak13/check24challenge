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
  const [pageSize, setPageSize] = createSignal(100);
  const [upperLimit, setUpperLimit] = createSignal(userRank);
  const [lowerLimit, setLowerLimit] = createSignal(userRank + 1);

  async function reset() {
    await props.refetch();
    const rank = props.rankings.findIndex((r) => r.name == props.userName);
    setUpperLimit(rank);
    setLowerLimit(rank + 1);
  }

  const [subsribe, unsubscribe] = useRealtimeRefetch();
  onMount(() => subsribe(reset));
  onCleanup(() => unsubscribe(reset));

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
    <Table headings={["Rank", "User", "Points", ""]} style='w-[700px]'>
      <For each={props.rankings.slice(0, upperLimit())}>
        {(ranking) => (
          <RankingTableRow
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
            ranking={ranking}
            handlePinUser={props.handlePinUser}
          />
        )}
      </For>
    </Table>
  );
};

export default RankingTable;
