"use client";
import GradualSpacing from "../magicui/gradual-spacing";
import LockedAch from "./LockedAch";
import UnlockedAch from "./UnlockedAch";

export default function AchievementLanding() {
  return (
    <div className="">
      <div className="flex justify-center">
        <GradualSpacing
          className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold italic flex justify-center py-7 xl:py-8 tracking-[-0.1em]  text-black dark:text-white md:leading-[5rem]"
          text="ACHIEVEMENTS"
        />
      </div>
      <UnlockedAch />
      <LockedAch />
    </div>
  );
}
