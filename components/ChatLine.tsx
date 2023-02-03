import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'


// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />

export type Message = {
  who: 'bot' | 'user' | undefined
  message?: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 mb-28">
    <div className='text-white'>Thinking...</div>
  </div>
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ who = 'bot', message }: Message) {
  if (!message) {
    return null
  }
  const formatteMessage = convertNewLines(message)

  return (
    <div
      className={
        who != "bot" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <BalancerWrapper>
        <div className="float-right mb-28 rounded-lg bg-indigo-600 p-2 shadow-lg ring-1 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-slate-400 font-mono">
                {who == "bot" ? "Jarvis" : "Me"}
              </p>
              <p
                className={clsx(
                  "text-white",
                  who == "bot" ? "font-mono" : "font-mono"
                )}
              >
                {formatteMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
