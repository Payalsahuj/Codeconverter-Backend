const express=require("express")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())

app.get("/user",(req,res)=>{
    res.send({msg:"okok"})
})

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/convert", async (req, res) => {
  try {
    const message = req.body
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system", content: `convert the given data into ${message.language} language
       
        ` },
      { role: "user", content: `${message.value}` }],
      max_tokens: 100,
      temperature: 0,
    })
    res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})


app.post("/output", async (req, res) => {
  try {
    const message = req.body
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system", content: `Give the output of this code` },
      { role: "user", content: `${message.value}` }],
      max_tokens: 200,
      temperature: 0,
    })
    res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})

app.post("/debug", async (req, res) => {
  try {
    const message = req.body
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system", content: `Please debug th code and give its solution` },
      { role: "user", content: `${message.value}` }],
      max_tokens: 200,
      temperature: 0,
    })
    res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})



app.post("/quality", async (req, res) => {
  try {
    const message = req.body
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system", content: `Please check the quality of code such as commentary on style, organization, potential improvements` },
      { role: "user", content: `${message.value}` }],
      max_tokens: 200,
      temperature: 0,
    })
    res.status(200).send(response.data.choices[0].message.content)
  } catch (error) {
    res.status(400).send({message: error.message})
  }
})


app.listen(process.env.port,()=>{
    try{
        console.log(`port is running at ${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})