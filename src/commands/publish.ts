import { exec } from "child_process";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "publish",
  restrictions: {
    ownerOnly: true,
  },
  usesArgs: true,
  usage: "<message: text>",
  async run(message, args) {
    exec(`npm run p/publish ${args.join(" ")}`);
    await message.channel.send(
      `:white_check_mark: Published to https://github.com/arcy-at/Hallucinate with message \`${args.join(
        " "
      )}\``
    );
  },
} as ICommand;
