require('dotenv').config()
const configuration = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
}

const express = require('express')
const app = express()
const line = require('@line/bot-sdk')
const client = new line.Client(configuration)

app.get('/', (req, res) => {
    res.status(200).send('Line Chatbot Running')
})


app.post('/event', line.middleware(configuration),(req,res) => {
    req.body.events.map(event => {
        // command list
        client.replyMessage(event.replyToken, { type: 'text', text: 'Your command list: /command, /second, /creator' }, false)

        // assign your command and text response here
        if(event.message.text.toLowerCase().includes('/command')){
            client.replyMessage(event.replyToken, { type: 'text', text: 'Your command get trigger here' }, false)
        }

        // second command
        if (event.message.text.toLowerCase().includes('/second')){
            client.replyMessage(event.replyToken, { type: 'text', text: 'Your second command trigger here' }, false)
        }

        // third command
        if (event.message.text.toLowerCase().includes('/creator')) {
            client.replyMessage(event.replyToken, { type: 'text', text: 'Doni wirawan who makes this repo' }, false)
        }
    })

    res.status(200).send('Line Chatbot Running')
})


app.listen(process.env.PORT)