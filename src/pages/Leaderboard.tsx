import { LeaderboardCard } from "../components/LearderboardCard";

export const Leaderboard = () => {
  return (
    <div className="max-w-[700px] w-[90%] pb-5 rounded-md bg-secondary mx-auto mt-10">
      <p className="font-bold text-PrimaryText text-center text-[30px]">Mango Leaderboard</p>
      <div className="flex flex-col mt-5 md:text-[20px] text-[16px]">
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
          <LeaderboardCard />
      </div>
    </div>
  )
};
