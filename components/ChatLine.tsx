// @ts-nocheck
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 mb-28">
    <div className="text-white font-mono">Thinking...</div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "bot", message }: Message) {
 
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  return (
    <>
      <div
        className={
          who != "bot" ? "float-right clear-both" : "float-left clear-both"
        }
      >
        <BalancerWrapper>
          <div className="float-right mb-10 rounded-lg p-2 ring-1 ring-indigo-600 sm:px-6">
            <div className="flex space-x-5">
              <div className="flex-1 gap-4">
                <p className="text-sm text-slate-300 font-mono">
                  {who == "bot" ? "Jarvis" : "me"}
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
