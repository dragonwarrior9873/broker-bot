const Telegraf = require('telegraf'); //includeing telegraf lib
const { getPixelDrifterChatId, getUpdates } = require('./util');

const bot = new Telegraf('6588664139:AAG160CRuCvi3DQKpSNi6m90-E44s6Bkex4'); // add your bot token
let chatInfos = []
const helpMessage = `
say something to me
/start - starts the bot
/help - command reference
/send - send CA to Admin
`;
const drifterHelpMessage = `
say something to me
/start - starts the bot
/help - command reference
/send - send message to all groups
`;
const startMessage = "Please enter the CA of the chart you want to boost. \n Use /send command to send CA.\n Example /send 9ovJ86kQmk1qrrFSQNY"
const drifterStartMessage = "Please enter the message to send all groups. \n Use /send command to send message.\n Exampe /send hello"
const replyMessage = "Please add @Fatality_Boost_Bot as an admin to your group telegram group. One of our Devs will verify and trigger your chart’s $FATALITY Boost within 12 hours."

bot.start((ctx) => {
    console.log(ctx)
    console.log(ctx.update.message.from)
    console.log(ctx.update.message.chat)
    chatInfos.push({ userName: ctx.chat.username, chatId: ctx.chat.id })
    if (!getPixelDrifterChatId(chatInfos)) {
        ctx.reply("@PixelDrifter isn't available now. \n Please wait until he is available.");
        return
    }
    if (ctx.chat.id != getPixelDrifterChatId(chatInfos)) ctx.reply(startMessage);
    else ctx.reply(drifterStartMessage);
})

bot.help((ctx) => {
    if (!getPixelDrifterChatId(chatInfos)) {
        ctx.reply("@PixelDrifter isn't available now. Please wait until he is available.");
        return
    }
    if (ctx.chat.id != getPixelDrifterChatId(chatInfos)) ctx.reply(helpMessage);
    else ctx.reply(drifterHelpMessage);
})

bot.command('send', async (ctx) => {
    let input = ctx.message.text;
    let inputArr = input.split(" ");
    if (inputArr.length != 2) {
        ctx.reply("Invalid Command. \n Use /send command to send CA.\n Example /send 9ovJ86kQmk1qrrFSQNY ")
        return
    }

    if (!getPixelDrifterChatId(chatInfos)) {
        ctx.reply("@PixelDrifter isn't available now. Please wait until he is available.");
        return
    }
    if (ctx.chat.id != getPixelDrifterChatId(chatInfos)) {
        let sendMessage = ctx.chat.username + " sent CA " + inputArr[1]
        ctx.reply(replyMessage)
        bot.telegram.sendMessage(getPixelDrifterChatId(chatInfos), sendMessage, {
            parse_mode: "markdown"
        });
    }
    else {
        // await getUpdates();
        for (let i = 0; i < chatInfos.length; i++) {
            const chat = chatInfos[i];
            if (chat.chatId == getPixelDrifterChatId(chatInfos)) continue
            bot.telegram.sendMessage(chat.chatId, inputArr[1], {
                parse_mode: "markdown"
            }).then((message) => {
                bot.telegram.pinChatMessage(chat.chatId, message.message_id)
            });
        }
    }

})

bot.launch();
