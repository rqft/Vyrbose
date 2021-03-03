import { ActivityOptions, Client, Collection, Intents } from "discord.js";
import { INTEGER, Sequelize, STRING, TEXT } from "sequelize";
import { config } from "./config";
import { regexes } from "./globals";
import { commandHandler } from "./handlers/commandHandler";
import { discordjsError } from "./handlers/discordjsError";
import { fetchCommandFiles } from "./handlers/fetchCommandFiles";
import { makeCommands } from "./handlers/makeCommandFromFile";
import { onReady } from "./handlers/onReady";
import { runCommandManager } from "./handlers/runCommandManager";
import { setUserPresence } from "./handlers/setUserPresence";
import { ICommand } from "./interfaces/ICommand";
import { logError } from "./logs/logError";
import { decor } from "./maps/emojiEnum";
import { color, TerminalColor } from "./types/TerminalColors";
/**
 * Presence Stuff
 */
setUserPresence();
export const client = new Client({
  intents: Intents.ALL,
  ws: {
    properties: {
      $browser: config.bot.presence.browser,
    },
  },
  allowedMentions: {
    roles: [],
    users: [],
    repliedUser: false,
  },
  retryLimit: 10,
});
client.user?.setActivity(config.bot.presence.activity.name, {
  name: config.bot.presence.activity.name,
  type: config.bot.presence.activity.type as ActivityOptions["type"],
  url: config.bot.presence.activity.url,
});
export const commands = new Collection<any, ICommand>();
export const commandFiles = fetchCommandFiles();
commandFiles.forEach(makeCommands(commands));
runCommandManager(commands);
export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});
export const Tags = sequelize.define("tags", {
  name: {
    type: STRING,
    unique: true,
  },
  description: TEXT,
  username: STRING,
  usage_count: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});
client.once("ready", async () => {
  Tags.sync();
  onReady();
});
client.on("error", (e) => discordjsError(e));
client.on("message", async (message) => {
  const sexes = message.content.match(regexes.sex);
  if (sexes)
    if (message.author !== client.user && !message.author.bot)
      await message.react(decor.Emojis.FLUSHED);

  await commandHandler(message);
});

process.on("uncaughtException", (e) => logError(e));
client.on("guildCreate", onReady);
client.on("disconnect", function (erMsg, code) {
  console.log(
    "----- Bot disconnected from Discord with code",
    color(code, TerminalColor.normal.BLUE),
    "for reason:",
    erMsg
  );
});
client.login(config.bot.token);
