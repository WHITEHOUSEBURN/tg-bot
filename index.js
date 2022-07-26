import TelegramApi from "node-telegram-bot-api";

import {gameOptions, againOptions} from "./options.js"

const token = '5556422424:AAGlwWESDnGP6s-iFy2VPxbxJ6aG3el2WLY'

const bot = new TelegramApi(token, {polling: true})

const start = () => {

    const chats = {}

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Имя и фамилия'},
        {command: '/game', description: 'Игра отгадай цифру'},
        {command: '/start', description: 'Начальное приветствие'}
    ])

    const startGame = async(chatId) => {
        await bot.sendMessage(chatId,'You should guess my number from 0 to 9')
        const randomNumber = Math.floor(Math.random() * 10) // Math.random returns number with ,
        chats[chatId] = randomNumber
        await bot.sendMessage(chatId, 'Go on', gameOptions)
    }

    bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    console.log(msg)
    if (text === '/start') {
        await bot.sendMessage(chatId, `Welcome`)
        return  bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/dc7/a36/dc7a3659-1457-4506-9294-0d28f529bb0a/1.webp')
    }
    if (text === 'info') {
        return  bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }
    if (text === '/game') {
      return   startGame(chatId)
    }
    return bot.sendMessage(chatId,`Cant understand you, ${msg.from.first_name} ${msg.from.last_name}`)
})
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data == '/again') {
           return  startGame(chatId)
        }
        if (data == chats[chatId]){
            return await bot.sendMessage(chatId, `Congrats, the right one is ${chats[chatId]}`, againOptions)
        }
        else {
           return  await bot.sendMessage(chatId, `${data} is not the needed one, right one is ${chats[chatId]}`, againOptions)
            console.log(msg)
        }
        })
}

start()

//
// console.log(againOptions, gameOptions)



