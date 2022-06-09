"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImaggaCategoriesCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "imagga categories",
            metadata: (0, command_metadata_1.ImageMetadata)("what is this image", "<target: Image>"),
        });
    }
    run = formatter_1.Formatter.Imagga.categories;
}
exports.default = ImaggaCategoriesCommand;
