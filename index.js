/** @format */

var TelegramBot = require("node-telegram-bot-api");
const { Wit } = require("node-wit");
require("dotenv").config({ path: ".env" });

const client = new Wit({
	accessToken: process.env.WIT_ACCESS_TOKEN,
});

telegram = new TelegramBot(process.env.TELEGRAM_CODE, { polling: true });

telegram.on("text", (message) => {
	console.log(message.chat.first_name + message.chat.last_name);
	client.message(message.text).then((data) => {
		console.log(data.entities.intent);
		if (data.entities.intent) {
			intent = data.entities.intent[0];
			if (intent.value === "greeting") {
				telegram.sendMessage(message.chat.id, "Hey, You.");
			} else if (intent.value === "start_where") {
				telegram.sendMessage(message.chat.id, "You can start by greeting me");
			} else {
				telegram.sendMessage(message.chat.id, "Idk");
			}
		} else {
			telegram.sendMessage(message.chat.id, "Wtf are you saying");
		}
	});
});
