"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageBrightnessCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image saturation",
            metadata: (0, command_metadata_1.ImageMetadata)("crisp", "<target: Image> <amount: 0-100=50>", [
                "@insyri#7314",
                "insyri 50",
                "533757461706964993 25",
            ]),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    required: true,
                },
                {
                    name: "amount",
                    type: parameters_1.Parameters.number({ min: 0 }),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.saturation;
}
exports.default = ImageBrightnessCommand;
