import { GameModeKey } from "./entities/enums/gamemodeType";
import { BukkitPlayer } from "./entities/types/bukkitPlayer";
import { Command, EventHandler, registerPlugin } from "./decorators";
import { EventPlayerInteractEvent, PlayerInteractEvent, PlayerInteractEventHelper } from "./events/types/player/playerInteractEvent";
import { EventPlayerJoinEvent, PlayerJoinEvent } from "./events/types/player/playerJoinEvent";
import { Enchantment } from "./items/enums/enchantmentType";
import { Material } from "./items/enums/materialType";
import { BukkitItemStack, createItemStack } from "./items/types/itemstack";
import { EntityType, GameMode, TreeType } from "./java/enums";
import { Particle } from "./particles/type/particle";
import { BukkitLocation } from "./world/types/location";
import { Vector } from "./world/types/vector";
import { BukkitWorld } from "./world/types/world";
import { BukkitCommandSender } from "./entities/types/commandSender";
import { EventEntityDeathEvent } from "./events/types/entity/entityDeathEvent";
import { EntityDeathEvent } from "./events/types/player/playerDeathEvent";
import { BukkitEntity } from "./entities/types/bukkitEntity";
import { javaListOf } from "./java/types/converter";

class MyPlugin {

  @EventHandler(PlayerJoinEvent)
  onJoin(event: EventPlayerJoinEvent) {
    Java.callStatic("org.bukkit.Bukkit", "broadcastMessage", "§aHi this server is using PaperTS!");
    const player = event.getPlayer();

    const loc = player.getLocation();
    player.sendMessage(`Hi yout pos is: §a${loc.getX()}  ${loc.getY()} ${loc.getZ()}`);
    player.setInvisible(false);
    player.setInvulnerable(true);
    const itemstack = createItemStack(Material.ELYTRA);
    itemstack.addUnsafeEnchantment(Enchantment.BINDING_CURSE, 1);
    player.getInventory().addItem(itemstack);
    player.sendMessage("You received an Elytra!")
    player.getWorld().generateTree(player.getLocation(), TreeType.ACACIA);
    const itemStack = createItemStack(Material.NETHERITE_SWORD);
    itemStack.addUnsafeEnchantment(Enchantment.SHARPNESS, 5);
    player.sendMessage("You received a Sword!")
    player.getInventory().addItem(itemStack);
    event.getPlayer().sendMessage("You are in " + Java.enumValue("org.bukkit.GameMode", "CREATIVE"));
    event.getPlayer().setGameMode(GameMode.CREATIVE);
  }

  @EventHandler(PlayerInteractEvent)
  onInteract(event: EventPlayerInteractEvent) {
    if (PlayerInteractEventHelper.isRightClick(event)) {

      const player: BukkitPlayer = event.getPlayer();
      const direction = player.getLocation().getDirection();
      player.setVelocity(Vector.create(
        direction.getX() * 2,
        direction.getY() * 2 + 0.5,
        direction.getZ() * 2
      ));
      player.getWorld().spawnParticle(Particle.EXPLOSION, player.getLocation().add(0, 2, 0), 15)

    }
  }


@EventHandler(EntityDeathEvent)
onDeathEntity(event: EventEntityDeathEvent) {
  const killer = event.getEntity().getKiller();
  
  if (killer && event.getEntityType().name() === "SPIDER") {
    killer.sendMessage("Ucciso SPIDER!");
    
    // Accedi all'evento Java direttamente
    const javaEvent = event as any;
    
    // Debug: vedi i metodi disponibili
    org.bukkit.Bukkit.broadcastMessage(`Event class: ${javaEvent.getClass?.()?.getName?.() ?? "unknown"}`);
    
    // Prova a chiamare il metodo Java originale
    try {
      const javaDrops = javaEvent.getDrops();
      org.bukkit.Bukkit.broadcastMessage(`Java drops class: ${javaDrops.getClass?.()?.getName?.()}`);
      org.bukkit.Bukkit.broadcastMessage(`Java drops size: ${javaDrops.size?.()}`);
      
      // Prova clear sul Java List
      javaDrops.clear();
      org.bukkit.Bukkit.broadcastMessage(`Dopo clear: ${javaDrops.size?.()}`);
      
      // Prova add
      javaDrops.add(createItemStack(Material.DIAMOND));
      org.bukkit.Bukkit.broadcastMessage(`Dopo add: ${javaDrops.size?.()}`);
      
    } catch (e) {
      org.bukkit.Bukkit.broadcastMessage(`ERRORE: ${e}`);
    }
  }
}

  @Command({
    name: "heal",
    description: "Cura un giocatore",
    usageMessage: "/heal [giocatore]",
    permission: "myplugin.admin.heal",
    aliases: ["cura"]
  })
  healCommand(sender: BukkitCommandSender, args: string[]) {
    /* Se il sender è un giocatore e non ha specificato un target, cura se stesso */
    const player: BukkitPlayer | null = isPlayer(sender);
    if (args.length === 0) {
      if (player) {
        player.setMaxHealth(100);
        player.setHealth(100);
        sender.sendMessage("§aSei stato curato!");
      } else {
        sender.sendMessage("§cDevi specificare un giocatore dalla console!");
      }
      return false;
  }
  return false;
  }
}

function isPlayer(cmdSender: BukkitCommandSender) : BukkitPlayer | null{
  return "getHealth" in cmdSender ? (cmdSender as BukkitPlayer) : null;
}
function isPlayerKiller(killer: BukkitEntity) : BukkitPlayer | null{
  return "getHealth" in killer ? (killer as BukkitPlayer) : null;
}

const plugin = new MyPlugin();
registerPlugin(plugin);