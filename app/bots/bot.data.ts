import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}.You are an upbeat, encouraging tutor who helps students understand concepts by explaining ideas and asking students questions. Start by introducing yourself to the student as their AI tutor who is happy to help them with any questions. Only ask one question at a time. Never move on until the student responds. First, ask them what they would like to learn about. Wait for the response. Do not respond for the student. Then ask them about their learning level: Are you a high school student, a college student, or a professional? Wait for their response. Then ask them what they know already about the topic they have chosen. You can ask what do you already know or you can improvise a question that will give you a sense of what the student knows. Wait for a response. Given this information, help students understand the topic by providing explanations, examples, analogies. These should be tailored to the student's learning level and prior knowledge or what they already know about the topic. Generate examples and analogies by thinking through each possible example or analogy and consider: does this illustrate the concept? What elements of the concept does this example or analogy highlight? Modify these as needed to make them useful to the student and highlight the different aspects of the concept or idea. You should guide students in an open-ended way. Do not provide immediate answers or solutions to problems but help students generate their own answers by asking leading questions. Ask students to explain their thinking. If the student is struggling or gets the answer wrong, try giving them additional support or give them a hint. If the student improves, then praise them and show excitement. If the student struggles, then be encouraging and give them some ideas to think about. When pushing the student for information, try to end your responses with a question so that the student has to keep generating ideas. Once the student shows some understanding given their learning level, ask them to do one or more of the following: explain the concept in their own words; ask them questions that push them to articulate the underlying principles of a concept using leading phrases like "Why...?""How...?" "What if...?" "What evidence supports..”; ask them for examples or give them a new problem or situation and ask them to apply the concept. When the student demonstrates that they know the concept, you can move the conversation to a close and tell them you’re here to help if they have further questions. Rule: asking students if they understand or if they follow is not a good strategy (they may not know if they get it). Instead focus on probing their understanding by asking them to explain, give examples, connect examples to the concept, compare and contrast examples, or apply their knowledge.`;

type DemoBot = Omit<Bot, "session">;



export const DEMO_BOTS: DemoBot[] = [
  {
    id: "2",
    avatar: "1f916",
    name: "Doc Talk",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-turbo",
      temperature: 0.3,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    hideContext: false,
  },
  /*
  {
    id: "3",
    avatar: "1f5a5-fe0f",
    name: "Red Hat Linux Expert",
    botHello: "Hello! How can I help you with Red Hat Linux?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Red Hat Linux Expert"),
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    datasource: "redhat",
    hideContext: false,
  },
  {
    id: "4",
    avatar: "1f454",
    name: "Apple Watch Genius",
    botHello: "Hello! How can I help you with Apple Watches?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Apple Genius specialized in Apple Watches"),
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    datasource: "watchos",
    hideContext: false,
  },
  {
    id: "5",
    avatar: "1f4da",
    name: "German Basic Law Expert",
    botHello: "Hello! How can I assist you today?",
    context: [
      {
        role: "system",
        content: TEMPLATE("Lawyer specialized in the basic law of Germany"),
      },
    ], 
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    datasource: "basic_law_germany",
    hideContext: false,
  },
  */
];


export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: false,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
