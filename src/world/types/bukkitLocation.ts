// https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Location.html
export interface BukkitLocation {
    getX(): number;
    getY(): number;
    getZ(): number;
    distance(location: BukkitLocation): number;
}

