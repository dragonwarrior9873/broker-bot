const Telegraf = require('telegraf'); //includeing telegraf lib

const bot = new Telegraf('6777923138:AAEY0Ft7WS3G9kLlk80IplZJcOdJ6z-b2wM'); // add your bot token

// help message text:
const helpMessage = `
say something to me
/start - starts the bot
/help - command reference
/echo - say user's name + " used the echo command"
/echo (words) - (words)
`;

// use method to log information
// bot.use((ctx, next) => {
//     // console.log(ctx.chat);
//     if(ctx.updateSubTypes[0] == 'text'){
//         // console.log(ctx.from.username + " said: " + ctx.message.text);
//         bot.telegram.sendMessage("yourChatID", ctx.from.username + " said: " + ctx.message.text);
//     }else{
//         // console.log(ctx.from.username+ " sent: "+ctx.updateSubTypes[0]);
//         bot.telegram.sendMessage("yourChatID", ctx.from.username+ " sent: "+ctx.updateSubTypes[0]);
//     }
//     next();
// })

// start command handler
bot.start((ctx) => {
    // logger(ctx);
    console.log(JSON.stringify(ctx));
    ctx.reply("Hello " + ctx.from.first_name);
    bot.telegram.sendMessage(ctx.chat.id, helpMessage, {
            parse_mode: "markdown"
          });
    ctx.reply(helpMessage);
})

// help command handler
bot.help((ctx) => {
    // logger(ctx);
    ctx.reply(helpMessage);
})

//echo command function
bot.command('echo', (ctx) => {
    // logger(ctx);
    // console.log(ctx);
    let input = ctx.message.text;
    let inputArr = input.split(" ");
    // console.log(inputArr);
    let message = "";
    if(inputArr.length == 1){
        message = ctx.from.first_name + " used the echo command";
    }
    else{
        inputArr.shift();
        message = inputArr.join(" ");
    }
    ctx.reply(message);
})


// this is a loger function example, it can be used in method to send you information

/* 
function logger(ctx) {
     console.log(ctx.from.username + " said: " + ctx.message.text);
}
*/

// at the end of your script remmember to add this, else yor bot will not run
bot.launch();
