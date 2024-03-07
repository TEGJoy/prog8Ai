//Express
import express from 'express'
import cors from 'cors'
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts";
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});
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
    const input = req.body.input;
    messages.push(["human", input]);
    messages.push(["system", "you're getting sligthly more drunk as  you take another drink of your whiskey."]);
    const answer = await model.invoke(messages);
    messages.push(["ai", answer.content]);
    res.json(answer.content);
    console.log(messages);
})
app.post('/anthro', async (req,res) =>  {
    //let prompt = req.body.prompt;
   
    const input = req.body.input;
    messages.push(["user", input]);
    messages.push(["system", "you're getting sligthly more drunk as  you take another drink of your whiskey."]);
    const message = await anthropic.messages.create({
        max_tokens: 300,
        messages: messages,
        model: 'claude-3-opus-20240229',
      });
    messages.push(["ai", message.content.text]);
    res.json(message.content);
    //console.log(messages);
})
//https://docs.anthropic.com/claude/reference/rate-limits 
//https://home.openweathermap.org/subscriptions voor je api key lol
//https://api.openweathermap.org/data/3.0/onecall?lat=51.991371&lon=4.473328& voorbeeld call, voer appid nog in
export default app