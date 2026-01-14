export const BukkitGamemode = {
    ADVENTURE: org.bukkit.GameMode.ADVENTURE,
    CREATIVE: org.bukkit.GameMode.CREATIVE,
    SPECTATOR: org.bukkit.GameMode.SPECTATOR,
    SURVIVAL: org.bukkit.GameMode.SURVIVAL,
} as const;

export type GamemodeKey = keyof typeof BukkitGamemode;