"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageInvertCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image invert",
            metadata: (0, command_metadata_1.ImageMetadata)("vignette", "<target: Image> <-method: InvertMethods=invert>", [
                "@insyri#7314",
                "insyri -method hue",
                "533757461706964993 -method value",
            ]),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    required: true,
                },
            ],
            args: [
                {
                    name: "method",
                    aliases: ["m", "type", "t"],
                    type: "string",
                    choices: Object.values(pariah_1.APIs.Jonathan.InvertMethods),
                    default: pariah_1.APIs.Jonathan.InvertMethods.INVERT,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.invert;
}
exports.default = ImageInvertCommand;
