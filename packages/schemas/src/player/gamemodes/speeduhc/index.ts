/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { APIData } from "@statsify/util";
import { Field } from "../../../metadata";
import { GameModes, IGameModes } from "../../../game";
import { SpeedUHCMastery } from "./mastery";
import { SpeedUHCMode } from "./mode";
import { getLevelIndex, titleScores } from "./util";

export const SPEED_UHC_MODES = new GameModes([
  { api: "overall" },
  { api: "solo", hypixel: "solo_normal" },
  { api: "teams", hypixel: "team_normal" },
  { api: "wildSpecialist" },
  { api: "guardian" },
  { api: "sniper" },
  { api: "berserk" },
  { api: "masterBaker" },
  { api: "invigorate" },
  { api: "huntsman" },
  { api: "fortune" },
  { api: "vampirism" },
]);

export type SpeedUHCModes = IGameModes<typeof SPEED_UHC_MODES>;

export class SpeedUHC {
  @Field()
  public overall: SpeedUHCMode;

  @Field()
  public solo: SpeedUHCMode;

  @Field()
  public teams: SpeedUHCMode;

  @Field()
  public coins: number;

  @Field()
  public score: number;

  @Field({ store: { default: "none" } })
  public activeMastery: string;

  @Field()
  public level: number;

  @Field()
  public levelFormatted: string;

  @Field()
  public title: string;

  @Field()
  public wildSpecialist: SpeedUHCMastery;

  @Field()
  public guardian: SpeedUHCMastery;

  @Field()
  public sniper: SpeedUHCMastery;

  @Field()
  public berserk: SpeedUHCMastery;

  @Field()
  public masterBaker: SpeedUHCMastery;

  @Field()
  public invigorate: SpeedUHCMastery;

  @Field()
  public huntsman: SpeedUHCMastery;

  @Field()
  public fortune: SpeedUHCMastery;

  @Field()
  public vampirism: SpeedUHCMastery;

  public constructor(data: APIData) {
    this.coins = data.coins;
    this.score = data.score;
    this.activeMastery = (data.activeMasterPerk ?? "none").replace("mastery_", "");

    this.overall = new SpeedUHCMode(data, "");
    this.solo = new SpeedUHCMode(data, "solo");
    this.teams = new SpeedUHCMode(data, "team");

    this.wildSpecialist = new SpeedUHCMastery(data, "wild_specialist");
    this.guardian = new SpeedUHCMastery(data, "guardian");
    this.sniper = new SpeedUHCMastery(data, "sniper");
    this.berserk = new SpeedUHCMastery(data, "berserk");
    this.masterBaker = new SpeedUHCMastery(data, "master_baker");
    this.invigorate = new SpeedUHCMastery(data, "invigorate");
    this.huntsman = new SpeedUHCMastery(data, "huntsman");
    this.fortune = new SpeedUHCMastery(data, "fortune");
    this.vampirism = new SpeedUHCMastery(data, "vampirism");

    const index = getLevelIndex(this.score);
    this.level = index + 1;
    this.levelFormatted = `§d[${this.level}❋]`;
    this.title = titleScores[index].title;
  }
}

export * from "./mastery";
export * from "./mode";
