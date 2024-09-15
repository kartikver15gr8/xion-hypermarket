import AchCard from "./AchCard";

export default function LockedAch() {
  return (
    <div className="w-full mt-8">
      <div>
        <p className="font-medium text-2xl">Locked Achievements</p>
        <p className="text-xs text-[#6a6a76] mt-1">
          We need these achievements!
        </p>
      </div>
      <div className="mt-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-2">
        <AchCard
          className="bg-[#A5A7A7]"
          points="13"
          status="LOCKED"
          title="Portfolio Pilot"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
        <AchCard
          className="bg-[#A5A7A7]"
          points="93"
          title="Aqua Tycoon"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
          status="LOCKED"
        />
        <AchCard
          className="bg-[#A5A7A7]"
          points="45"
          status="LOCKED"
          title="Interest Initiator"
          description="Invest in 3 different assets on the platform"
        />
        <AchCard
          className="bg-[#A5A7A7]"
          points="32"
          status="LOCKED"
          title="Stablecoin Ape"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
        <AchCard
          className="bg-[#A5A7A7]"
          points="50"
          status="LOCKED"
          title="Stablecoin Sultan"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
        <AchCard
          className="bg-[#A5A7A7]"
          points="25"
          status="LOCKED"
          title="Yeild Novice"
          description="Deposit and maintain $500 in liquidity for 30 consecutive days"
        />
      </div>
    </div>
  );
}
