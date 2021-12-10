import { Command } from "detritus-client";
import { CommandClient } from "detritus-client/lib/commandclient";
import gm from "gm";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { BaseCommand } from "../basecommand";
export interface EdgesArgs {
  image: Buffer;
  radius: number;
}
export class EdgesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "edges",
      label: "image",
      type: Parameters.image,
      required: true,

      args: [{ name: "radius", type: "number", default: 1 }],
    });
  }
  async run(context: Command.Context, args: EdgesArgs) {
    let value = Buffer.from([]);
    gm(args.image)
      .edge(args.radius)
      .toBuffer((error, buffer) => {
        if (error) {
          context.reply("Error: " + error);
        }
        value = buffer;
      });
    let embed = await createImageEmbed(context, value, `blur`);
    context.reply({ embed });
  }
}
