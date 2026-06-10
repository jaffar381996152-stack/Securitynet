import TokenomicsHero from "./TokenomicsHero";
import OverviewStats from "./OverviewStats";
import AllocationDonut from "./AllocationDonut";
import VestingSchedule from "./VestingSchedule";
import TokenUtility from "./TokenUtility";
import SmartContract from "./SmartContract";

export default function Tokenomics() {
  return (
    <>
      <TokenomicsHero />
      <OverviewStats />
      <AllocationDonut />
      <VestingSchedule />
      <TokenUtility />
      <SmartContract />
    </>
  );
}
