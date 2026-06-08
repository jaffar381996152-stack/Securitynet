import Presalepage from "./presale/page";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "XN Token Presale",
  description:
    "Join the SecurityNet (XN) presale — purchase XN, the BEP-20 utility token powering the Securitynet AI security ecosystem on Binance Smart Chain, at $0.20 per token.",
  path: "/",
});

export default function EntryPoint() {
  return (
    <>
      <Presalepage />
    </>
  );
}
