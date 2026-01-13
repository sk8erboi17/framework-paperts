import { BukkitLocation } from "../../world/types/bukkitLocation";
import { EntityTypeKey } from "../enums/entityType";

export interface BukkitEntity {
  getLocation(): BukkitLocation;
  getType(): EntityTypeKey;
  remove(): void;
  setGlowing(isGlowing: boolean): void;
  setInvulnerable(isVulnerable: boolean): void;
  teleport(location: BukkitLocation): boolean;
  isOnGround(): void;
  isValid(): boolean;
  setCustomNameVisible(isVisible: boolean): void;
  setRotation(yaw: number, pitch: number): void;
  hasGravity(): boolean;
  isCustomNameVisible(): boolean;
  isDead(): boolean;
  isEmpty(): boolean; 
  isFrozen(): boolean;
  isGlowing(): boolean;
  isInsideVehicle(): boolean;
  isInvulnerable(): boolean;
  isInWater(): boolean;
  isInWorld(): boolean;
  isPersistent(): boolean;
  isSilent(): boolean;
  isVisibleByDefault(): boolean;
  isVisualFire(): boolean;
  leaveVehicle(): void;
  removePassenger(passenger: BukkitEntity): void;
  removeScoreboardTag(tag: string): void;
  setFallDistance(distance: number): void;
  setFireTicks(ticks: number): void;
  setFreezeTicks(ticks: number): void;
  teleport(destination: BukkitEntity): boolean
}