// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { initialMessages } from "../../components/Chat";
import { type Message } from "../../components/ChatLine";

const botName = "Jarvis";
// userName is a global variable coming from function handler
const firstMessge = initialMessages[0].message;

function generatePromptFromMessages(messages: Message[]) {
  let prompt = "";

  // add first user message to prompt
  prompt += messages[1].message;

  // remove first conversaiton (first 2 messages)
  const messagesWithoutFirstConvo = messages.slice(2);

  // early return if no messages
  if (messagesWithoutFirstConvo.length == 0) {
    return prompt;
  }

  messagesWithoutFirstConvo.forEach((message: Message) => {
    const name = message.who === "user" ? userName : botName;
    prompt += `\n${name}: ${message.message}`;
  });
  return prompt;
};

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {

  const body = await req.json();

  global.userName = body.session ? body.session.user.name : "Questioner"

  const messagesPrompt = generatePromptFromMessages(body.messages);

  const defaultPrompt = `I am Friendly AI Assistant. \n\nThis is the conversation between AI Bot and a news reporter.\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `;
  const finalPrompt = process.env.AI_PROMPT
    ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
    : defaultPrompt;

  const payload = {
    model: "text-davinci-003",
    prompt: finalPrompt,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [`${botName}:`, `${userName}:`],
    user: body?.user,
  };

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  if (process.env.OPENAI_API_ORG) {
    requestHeaders["OpenAI-Organization"] = process.env.OPENAI_API_ORG;
  }

  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.error) {
    console.error("OpenAI API error: ", data.error);
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    });
  }

  // return response with 200 and stringify json text
  return NextResponse.json({ text: data.choices[0].text });
}
