// @ts-nocheck


export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

export function ChatLine({ who = "bot", message }: Message) {

  if (!message) {
    return null;
  }

  // names that will show on chat bubbles
  let firstName = ""
  let botName = "Jarvis";

  // util helper to convert new lines to <br /> tags
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));

  const formatteMessage = convertNewLines(message);

            //   ? "float-right clear-both font-mono text-xs text-slate-300"
            // : "float-left clear-both font-mono text-xs text-slate-300"

  return (
    <>
      <div
        className={
          who != "bot"
            ? "flex justify-end font-mono text-xs text-slate-300"
            : "flex justify-start font-mono text-xs text-slate-300"
        }
      >
        <div
          className={
            who != "bot"
              ? "float-right mb-10 rounded-2xl rounded-br-none py-2 px-4 ring-1 ring-indigo-600"
              : "float-right mb-10 rounded-2xl rounded-bl-none py-2 px-4 ring-1 ring-[#BB00A9]"
          }
        >
          <div className="flex space-x-5">
            <div className="flex-1 gap-4 ">
              <p
                className={
                  who == "bot" ? "flex justify-start" : "flex justify-end"
                }
              >
                {who == "bot" ? botName : firstName}
              </p>
              <p className="text-white text-lg">{formatteMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
