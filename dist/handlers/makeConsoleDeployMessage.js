"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConsoleDeployMessage = void 0;
const __1 = require("..");
const TerminalColors_1 = require("../types/TerminalColors");
function makeConsoleDeployMessage() {
    const message = [
        `Logged in as ${TerminalColors_1.color(__1.client.user?.tag, "\u001B[34m")} [${TerminalColors_1.color(__1.client.user?.id, "\u001B[30;1m")}]`,
        `\n`,
        `Fetching Guilds...`,
        __1.client.guilds.cache
            .array()
            .map((e) => `✅ Deployed to ${TerminalColors_1.color(e.name, "\u001B[32m").padEnd(60)} [${TerminalColors_1.color(e.id, "\u001B[30;1m")}] as ${TerminalColors_1.color(e.me?.displayName, "\u001B[31m").padStart(32)} (${TerminalColors_1.color("owned by " + e.owner?.user.tag, "\u001B[30;1m")})`)
            .join("\n")
            .replace(/\n{2}/gm, "\n"),
        TerminalColors_1.color("Ready!", "\u001B[36m"),
    ];
    console.log(message.join("\n"));
}
exports.makeConsoleDeployMessage = makeConsoleDeployMessage;
