import { Events } from "discord.js"
import type { ClientWithCommands } from "../interfaces"

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: ClientWithCommands) {
    console.log(`${client.user?.username} is online!`)
    client.user?.setActivity("definecultured.com")
  }
}
