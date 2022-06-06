/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import * as Process from "node:child_process";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { editOrReply } from "../tools";
import { Embed } from "./embed";
export interface CodeArgs {
  code: string;
  "json-spacing": number;
}
export async function code(
  context: Context | InteractionContext,
  args: CodeArgs
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }

  const text = args.code;
  let language = "ts";
  let message: string;
  try {
    message = await Promise.resolve(eval(text));

    if (typeof message === "object") {
      message = JSON.stringify(message, null, args["json-spacing"]);
      language = "json";
    }
  } catch (error) {
    message =
      error instanceof Error
        ? error.stack || error.message
        : error instanceof Err
        ? error.toString()
        : (error as string);
  }

  message = String(message);

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message, language).toString()
  );
}
export interface ExecArgs {
  code: string;
}
export async function exec(
  context: Context | InteractionContext,
  args: ExecArgs
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }
  const text = args.code;
  let message = "";
  try {
    const data = Process.execSync(text);
    message = data.toString("utf-8");
  } catch (error) {
    message = (error as Error).message;
  }

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message).toString()
  );
}
export interface KwanziArgs {
  text: string;
}
export async function kwanzi(
  context: Context | InteractionContext,
  args: KwanziArgs
): Promise<Message | null> {
  const { text: payload } = args;
  const list = Array.from(new Set(payload.toLowerCase().split(" ")));
  const hit: Array<string> = [];
  const output: Array<string> = [];

  while (hit.length < list.length) {
    const index = Math.floor(Math.random() * list.length);
    const item = list[index]!;
    output.push(item);
    if (hit.includes(item)) {
      continue;
    }

    hit.push(item);
    if (Math.random() > 0.7) {
      list.splice(index, 1);
    }
  }

  return await editOrReply(context, output.join(" "));
}

export async function stats(
  context: Context | InteractionContext
): Promise<void> {
  const embed = Embed.user(context);
  if (embed) {
    void 0;
  }
}

export async function ping(
  context: Context | InteractionContext
): Promise<Message | null> {
  const ts =
    "message" in context
      ? context.message.createdAtUnix || context.message.editedAtUnix
      : context.interaction.createdAtUnix;
  return await editOrReply(context, `${Date.now() - ts}ms`);
}
