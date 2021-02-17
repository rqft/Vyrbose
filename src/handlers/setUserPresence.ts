import RPC from "discord-rpc";
import { config } from "../config";
export async function setUserPresence() {
  const RPCClient = new RPC.Client({ transport: "ipc" });
  RPCClient.on("ready", () => {
    //   RPCClient.request("SET_ACTIVITY", {
    //     pid: pid,
    //     activity: {
    //       assets: {
    //         large_image: "hallucinate",
    //         large_text: "uwu",
    //         // you can also set "small_image" and "small_text"
    //       },
    //       buttons: [
    //         {
    //           label: "<3",
    //           url: "https://arcy-at.github.io/page/cutie",
    //         },
    //         {
    //           label: "hi",
    //           url:
    //             "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot",
    //         },
    //       ],
    //     },
    //   });
    RPCClient.setActivity({
      joinSecret: "0000",
      instance: true,
      largeImageKey: "hallucinate",
      partyMax: 10,
      partySize: 2,
    });
  });

  RPCClient.login({
    clientId: config.bot.application.clientId,
  });
}
