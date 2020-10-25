"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 1800 });
module.exports.run = (_bot, message, _args) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        let emails;
        const value = yield cache.get('emails');
        if (value === undefined) {
            emails = yield prisma.subscriptionEmail.count();
            cache.set('emails', emails);
        }
        else {
            emails = value;
        }
        const actual = emails - 5;
        message.channel.send(`${actual} emails on record.`);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    finally {
        prisma.$disconnect();
    }
});
module.exports.command = {
    name: 'emails',
    alias: 'e'
};
//# sourceMappingURL=getEmailSignups.js.map