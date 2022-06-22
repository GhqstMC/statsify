/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { ApiProperty } from "@nestjs/swagger";
import { NotFoundException } from "./base.404";
import { Player } from "@statsify/schemas";

export class RecentGamesNotFoundException extends NotFoundException {
  @ApiProperty()
  public uuid: string;

  @ApiProperty()
  public displayName: string;

  public constructor(player: Player) {
    super("recentGames");

    this.uuid = player.uuid;
    this.displayName = player.displayName;
  }
}
