import { PlayerScore } from "../pages/Leaderboard";

interface LeaderboardCardProps {
    playerScore: PlayerScore;
    index: number;
}
export const LeaderboardCard = ({playerScore,index}:LeaderboardCardProps) => {

    return (
        <div className="bg-mainBg w-[70%] mx-auto rounded p-2 flex place-content-between mt-5">
            <p className="font-bold text-PrimaryText">{index+1}. {playerScore.DisplayName}</p>
            <p className="font-bold text-PrimaryText">Points: {playerScore.Score}</p>
        </div>
    )
}