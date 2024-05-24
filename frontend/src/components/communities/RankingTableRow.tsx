import { RiMapMapPin4Line } from "solid-icons/ri";
import { Component } from "solid-js";
import { UserRanking } from "../../utils/types/UserRanking";

const RankingTableRow: Component<{
  ranking: UserRanking;
  handlePinUser: (r: UserRanking) => void;
}> = (props) => {
  return (
    <tr class='border-b border-silver/10'>
      <td class='pl-4 py-4 text-silver'>{props.ranking.rank}</td>
      <td class='pl-4 py-4'>{props.ranking.name}</td>
      <td class='pl-4 py-4'>{props.ranking.points}</td>
      <td class='pl-4 py-4'>
        <button onClick={() => props.handlePinUser(props.ranking)}>
          <RiMapMapPin4Line
            size={20}
            class={`text-dark-gray hover:text-light-blue cursor-pointer`}
          />
        </button>
      </td>
    </tr>
  );
};

export default RankingTableRow;
