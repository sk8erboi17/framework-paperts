import { EventHandler, registerPlugin } from "./events/decorators";
import { EventPlayerJoinEvent, PlayerJoinEvent } from "./events/types/playerJoinEvent";

class MyPlugin {

  @EventHandler(PlayerJoinEvent)
  onJoin(event: EventPlayerJoinEvent) {
    event.getPlayer().sendMessage("Hi! Your pos is:");
    event.getPlayer().sendMessage("§a" +
      event.getPlayer().getLocation().getX() + "  " +
      event.getPlayer().getLocation().getY() + " " +
      event.getPlayer().getLocation().getZ()
    )
  }

}

const plugin = new MyPlugin();
registerPlugin(plugin);