import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  modelName: "gpt-4",
  openAIApiKey: "121323",
  configuration: {
    baseURL: "http://192.168.11.199:1282/v1",
  },
});

export default chatModel;