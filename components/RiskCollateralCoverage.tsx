"use client";

import CollateralRiskMeter from "./CollateralRiskMeter";
import CollateralValCard from "./CollateralValCard";
import Reveal from "./framerEffects/Reveal";
import BlurFade from "./magicui/blur-fade";

export default function RiskCollateralCoverage() {
  return (
    <BlurFade delay={0.5} inView>
      <div className="px-2 grid grid-cols-1 lg:grid-cols-11 lg:gap-x-1 mt-4 xl:mt-8 mb-5 h-fit">
        <div className="col-span-3">
          <CollateralRiskMeter
            heading="At Risk Collateral Coverage"
            subtext="Under text explaining this card"
            perc="100%"
          />
        </div>
        <div className="my-4 lg:my-0 col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-1">
          <CollateralValCard
            heading="Total Locked Collateral Value"
            value="44.4k"
          />
          <CollateralValCard heading="Total Pool Value" value="10.0k" />
          <CollateralValCard heading="Total Locked Collateral" value="50.0k" />
          <CollateralValCard heading="My Total Active Bids" value="0.0" />
        </div>
      </div>
    </BlurFade>
  );
}
