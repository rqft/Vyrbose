import { BaseSlashSubCommand } from "../baseslash";
export declare class SearchUrbanSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/search").Search.urban;
}
