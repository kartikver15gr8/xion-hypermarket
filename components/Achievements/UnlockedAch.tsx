import AchCard from "./AchCard";

export default function UnlockedAch() {
  return (
    <div className="w-full">
      <div>
        <p className="font-medium text-2xl">Unlocked Achievements</p>
        <p className="text-xs text-[#6a6a76] mt-1">
          This all you got? Time to sendit and get them all
        </p>
      </div>
      <div className="mt-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-2">
        <AchCard
          className="bg-[#E8ECEC]"
          points="13"
          date="08/08/24"
          title="Liquid Novice"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
        <AchCard
          className="bg-[#E8ECEC]"
          points="13"
          title="Liquid Novice"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
          status="LOCKED"
        />
        <AchCard
          className="bg-[#E8ECEC]"
          points="15"
          date="08/08/24"
          title="Diversified Inverster"
          description="Invest in 3 different assets on the platform"
        />
        <AchCard
          className="bg-[#E8ECEC]"
          points="13"
          date="08/08/24"
          title="Liquid Novice"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
      </div>
    </div>
  );
}
