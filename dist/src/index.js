"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Discord = __importStar(require("discord.js"));
require("dotenv/config");
const bot = new Discord.Client({ disableMentions: 'everyone' });
bot.commands = new Discord.Collection();
// Load commands
const fileRegex = new RegExp(/\.(js|ts)$/);
const generalCommands = fs_1.default.readdirSync(__dirname + '/commands').filter(file => fileRegex.test(file));
for (const file of generalCommands) {
    const props = require(__dirname + `/commands/${file}`);
    console.log(`${file} loaded!`);
    bot['commands'].set(props.command.name, props);
    if (props.command.alias) {
        bot['commands'].set(props.command.alias, props);
    }
}
// Event listener
fs_1.default.readdir(__dirname + '/modules/events', (err, files) => {
    if (err)
        return console.error(err);
    files.forEach(file => {
        if (!fileRegex.test(file))
            return;
        const event = require(__dirname + `/modules/events/${file}`);
        const eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
    });
});
bot.login(process.env.BOT_TOKEN);
//# sourceMappingURL=index.js.map