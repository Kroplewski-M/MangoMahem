import { collection, getDocs } from "firebase/firestore";
import { LeaderboardCard } from "../components/LearderboardCard";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export interface PlayerScore{
  UserId: string;
  Score: number;
  DisplayName: string;
}

export const Leaderboard = () => {
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  useEffect(() => {console.log(playerScores)}, [playerScores]);
  const fetchLeaderboard = async () => {
    const querySnapshot = await getDocs(collection(db, "userScores"));
    const scoresData: PlayerScore[] = [];
    querySnapshot.forEach((doc) => {
      const scoreData = doc.data() as PlayerScore;
      const scoreWithId = { ...scoreData, Id: doc.id };
      scoresData.push(scoreWithId);
    });
    scoresData.sort((a, b) => b.Score - a.Score);
    setPlayerScores(scoresData);
  }
  useEffect(() => {
    fetchLeaderboard();
  }, []);
  return (
    <div className="max-w-[700px] w-[90%] pb-5 rounded-md bg-secondary mx-auto mt-10">
      <p className="font-bold text-PrimaryText text-center text-[30px]">Mango Leaderboard</p>
      <div className="flex flex-col mt-5 md:text-[20px] text-[16px]">
        {
          playerScores.map((playerScore, index) => (
            <LeaderboardCard key={index} playerScore={playerScore} index={index} />
          ))
        }
      </div>
    </div>
  )
};
