import { Message, Permissions } from "discord.js";
import { config } from "../config";
import { fetchCommand } from "../functions/fetchCommand";
import { ICommand } from "../interfaces/ICommand";
import { logBlacklistedUserAction } from "../logs/logBlacklistedUserAction";
import { logCommandError } from "../logs/logCommandError";
import { logCommandUse } from "../logs/logCommandUse";

export function commandHandler(message: Message) {
  // check for prefixes;
  const prefixRegex = new RegExp(
    `^(${config.bot.prefixes.join("|")})( ?)`,
    "gi"
  );
  if (message.content.match(prefixRegex) == null) return;
  const prefix = message.content.match(prefixRegex)!.join("");

  /**
   * Arguments passed to the command
   */
  const args = message.content.slice(prefix!.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();

  /**
   * the set of commands owo
   */
  const command: ICommand = fetchCommand(commandName);

  /**
   * This is obvious lol
   */
  if (!command) return;

  /**
   * Blacklist
   */
  if (config.blacklist.users.includes(message.author.id)) {
    logBlacklistedUserAction(message);
    return;
  }

  /**
   * Restriction Stuff
   */
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !config.bot.ownerIds.includes(message.author.id)
  )
    return message.channel.send(
      ":lock: Missing Permissions; You need: `Bot Owner`"
    );
  if (
    command.restrictions &&
    command.restrictions.serverOwnerOnly &&
    message.guild &&
    message.guild!.ownerID !== message.author.id
  )
    return message.channel.send(
      ":lock: Missing Permissions; You need: `Server Owner`"
    );
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member?.permissions.has(
      new Permissions(command.restrictions.permissions),
      true
    )
  )
    return message.channel.send(
      `:lock: Missing Permissions; You need: \`${command.restrictions.permissions.join(
        ", "
      )}\``
    );

  if (
    command.restrictions &&
    command.restrictions.guildOnly &&
    message.channel.type === "dm"
  )
    return message.channel.send(
      ":warning: I can't execute that command inside DMs!"
    );

  if (command.usesArgs && !args.length) {
    let reply = `:warning: Argument Error (\`<any>\`: missing argument)`;

    if (command.usage) {
      reply += `\`\`\`${prefix}${command.name} ${command.usage}\`\`\``;
    }

    return message.channel.send(reply);
  }

  try {
    logCommandUse(message);
    command.run(message, args);
  } catch (error) {
    console.error(error);
    logCommandError(message, error);
    message.channel.send(`:warning: ${error}`);
  }
}
