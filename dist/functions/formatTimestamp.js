"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimestamp = void 0;
function formatTimestamp(date) {
    return `**[**\`${new Date(date).toLocaleString()}\`**]**`;
}
exports.formatTimestamp = formatTimestamp;
