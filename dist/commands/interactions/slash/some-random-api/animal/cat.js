"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalCatSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalCatSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "cat";
    description = "meow";
    run = formatter_1.Formatter.SomeRandomApi.animal(fetch_1.APIs.SomeRandomApi.Animals.CAT);
}
exports.AnimalCatSlashSubCommand = AnimalCatSlashSubCommand;
