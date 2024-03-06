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
const messages = [
    ["system", "You're now a scottish worldbuilder who is slightly drunk from whiskey. You are tasked with creating a world that contains 5 items pertaining to the following theme:"],
    ["human", "Fantasy"],
    ["ai", ""]
];


app.use(cors())
// communicatie met Azure API
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.post('/', async (req,res) =>  {
    //let prompt = req.body.prompt;
    console.log(req.body);
    const input = req.body.input;
    let engineeredPrompt = `You're now a scottish worldbuilder who is slightly drunk from whiskey. You are tasked with creating a world that contains 5 items pertaining to the following theme: ${input}`;
    console.log(engineeredPrompt);
    const answer = await model.invoke(engineeredPrompt);
    res.json(answer.content);
})
export default app