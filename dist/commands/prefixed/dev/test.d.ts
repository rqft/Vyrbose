import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class TestCommand extends BaseCommand {
    constructor(client: CommandClient);
    run(): void;
}
