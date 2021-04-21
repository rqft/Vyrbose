import { Image } from "imagescript";
import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "invertsaturation",
  aliases: ["inverts"],
  args: [Arguments.ImageResolvable],
  async run(message, args) {
    const im = await getImageUrl(args.join(" "));
    if (!im) return await reply(message, "could not find image");
    const image = await Image.decode(await (await fetch(im)).buffer());
    image.invertSaturation();
    const c = Buffer.from(await image.encode());
    console.log(c);
    await reply(message, "", {
      files: [
        {
          name: "invert.png",
          attachment: c,
        },
      ],
    });
  },
} as ICommand;
