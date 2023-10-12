const TelegramBot = require('node-telegram-bot-api');
const axios=require('axios')
const weatherApiKey ='feaaa96f27f4310814584b2bc644de95'; 
require('dotenv').config();
const token=process.env.Token;
const bot = new TelegramBot(token, {polling: true});
bot.on('message', async(msg)=>{
    const id=msg.from.id;
    const chat_id=msg.chat.id;
    const userInputText=msg.text;
    
    const userName=msg.chat.first_name;

    if (msg.text=='/start') {
        bot.sendMessage(id,`Hi! ${userName} Welcome To Vinay's World ,I am a simple telegram bot which can help you to find the weather of any city in India`)
        return
    }     //when user send /start command then this code will run
    
    const weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${userInputText}&units=metric&appid=${weatherApiKey}`
    await axios.get(weatherURL).then((res)=>{
        console.log(res);
        const data=res.data;
        const weatherInfo=data.weather[0].description;
        const temp_of_city=data.main.temp;
        const resMsg=`In your ${userInputText} : ${weatherInfo} and \n Temperature :${temp_of_city}`
        bot.sendMessage(chat_id,resMsg);
    })
    .catch((err)=>{
        bot.sendMessage(chat_id,`There is Some Problem in fetching the Weather Info From your City ${userInputText} . \nI request You to Please Check the Spelling and make sure you have write a correct city name`)
    })
})//when you receve a msg