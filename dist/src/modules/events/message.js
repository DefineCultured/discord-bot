"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../../../config.json"));
const discord_js_1 = __importDefault(require("discord.js"));
require("dotenv/config");
const { SERVER_ID, BOT_CHANNEL_ID } = process.env;
const bot = new discord_js_1.default.Client({ disableMentions: 'everyone' });
bot.commands = new discord_js_1.default.Collection();
module.exports = (bot, message) => {
    if (message.author.bot)
        return;
    if (message.channel.type === 'dm')
        return;
    if (message.guild.id !== SERVER_ID)
        return;
    if (message.channel.id !== BOT_CHANNEL_ID)
        return;
    const prefix = config_json_1.default.prefix;
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0].toLowerCase();
    const args = message.content.slice(prefix.length).split(/ +/).slice(1);
    if (message.content.startsWith(config_json_1.default.prefix)) {
        const commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) {
            commandfile.run(bot, message, args);
        }
    }
};
//# sourceMappingURL=message.js.map