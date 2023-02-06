// @ts-nocheck
export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export function ChatLine({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }

  let mySelf = "Me";
  let botName = "Jarvis"

  // util helper to convert new lines to <br /> tags
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));

  const formatteMessage = convertNewLines(message);

  return (
    <>
      <div
        className={
          who != "bot" ? "float-right clear-both" : "float-left clear-both"
        }
      >
        <div
          className={
            who != "bot"
              ? "float-right mb-10 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl py-2 px-4 ring-1 ring-indigo-600"
              : "float-right mb-10 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl py-2 px-4 ring-1 ring-[#BB00A9]"
          }
        >
          <div className="flex space-x-5">
            <div className="flex-1 gap-4">
              <p
                className={
                  who == "bot"
                    ? "text-xs text-slate-300  font-mono flex justify-start"
                    : "text-xs text-slate-300  font-mono flex justify-end"
                }
              >
                {who == "bot" ? botName : mySelf}
              </p>
              <p className="text-white text-lg font-mono">{formatteMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
