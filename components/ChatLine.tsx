// @ts-nocheck
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export function ChatLine({ who = "bot", message }: Message) {

  if (!message) {
    return null;
  }

  // util helper to convert new lines to <br /> tags
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));

  const formatteMessage = convertNewLines(message);
  const mySelf = "Me";

  return (
    <>
      <div
        className={
          who != "bot" ? "float-right clear-both" : "float-left clear-both"
        }
      >
        <BalancerWrapper>
          <div className="float-right mb-10 rounded-lg py-2 px-3 ring-1 ring-indigo-600">
            <div className="flex space-x-5">
              <div className="flex-1 gap-4">
                <p
                  className={
                    who == "bot"
                      ? "text-sm text-slate-300 font-mono flex justify-start"
                      : "text-sm text-slate-300 font-mono flex justify-end"
                  }
                >
                  {who == "bot" ? "Jarvis" : mySelf}
                </p>
                <p className="text-white text-lg font-mono">
                  {formatteMessage}
                </p>
              </div>
            </div>
          </div>
        </BalancerWrapper>
      </div>
    </>
  );
}
