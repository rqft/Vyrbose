import { RoleData } from "discord.js";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { parseTimeString } from "../functions/parseTimeString";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
export const overrides: { [any: string]: RoleData } = {
  adm: {
    name: "--ov-admin",
    permissions: "ADMINISTRATOR",
  },
  mngserver: {
    name: "--ov-manage-server",
    permissions: "MANAGE_GUILD",
  },
  mngchannels: {
    name: "--ov-manage-channels",
    permissions: "MANAGE_CHANNELS",
  },
  logs: {
    name: "--ov-logs",
    permissions: "VIEW_AUDIT_LOG",
  },
  roles: {
    name: "--ov-roles",
    permissions: "MANAGE_ROLES",
  },
  msgs: {
    name: "--ov-messages",
    permissions: "MANAGE_MESSAGES",
  },
};
module.exports = {
  name: "override",
  aliases: ["ov"],
  restrictions: {
    ownerOnly: true,
  },
  usage: "<override: devOverride>",
  usesArgs: true,
  async run(message, args) {
    const time = args[0] ?? "1m";
    if (args[0] == "clear") {
      message.member?.roles.cache.forEach((e) => {
        if (e.name.startsWith("--ov-")) e.delete();
      });
      return await message.channel.send(`:white_check_mark: Cleared`);
    }
    const override = args.slice(1).join(" ").toLowerCase();
    const ms = parseTimeString(time);
    if (ms < 500)
      return await message.channel.send(
        "Must be higher than 500 milliseconds / Invalid Time String"
      );

    if (!Object.keys(overrides).includes(override))
      return await message.channel.send(
        `:warning: Unknown Override, available options are ${Object.keys(
          overrides
        )
          .map((e) => `\`${e}\``)
          .join(", ")}`
      );

    const ovRole = overrides[override];
    const role = await message.guild?.roles.create({
      data: {
        name: ovRole?.name,
        permissions: ovRole?.permissions,
        color: Color.embed,
      },
    });
    await message.member?.roles.add(role!);
    await message.channel.send(
      `:white_check_mark: Gave you \`${
        ovRole?.name
      }\` override for ${simpleGetLongAgo(Date.now() - ms)}`
    );
    setTimeout(async () => {
      await role?.delete();
      try {
        await message.react("⏲");
      } catch (_) {
        await message.channel.lastMessage?.react("⏲");
      }
    }, ms);
  },
} as ICommand;
