//Express
import express from 'express'
import cors from 'cors'
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts";
const model = new ChatOpenAI({
azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})
const app = express()
const port = 2000
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
const messages = [];


app.use(cors())
// communicatie met Azure API
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.get('/', async (req,res) => {
    const themes = ["fantasy", "future", "action", "horror", "anime"]
    const theme = Math.floor(Math.random() * themes.length);
    let engineeredPrompt = `You're now a scottish worldbuilder who is slightly drunk from whiskey. You are tasked with creating a world that contains 5 items pertaining to the following theme: ${themes[theme]}`;
    messages.push(["system", engineeredPrompt])
    const answer = await model.invoke(engineeredPrompt)
    messages.push(["ai", answer.content]);
    res.json(answer.content);
})
app.post('/', async (req,res) =>  {
    //let prompt = req.body.prompt;
    console.log(messages);
    const input = req.body.input;
    messages.push(["human", input]);
    const answer = await model.invoke(messages);
    messages.push(["ai", answer.content]);
    res.json(answer.content);
})
export default app