/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { BaseProfileProps } from "../base.hypixel-command";
import {
  Container,
  Footer,
  Header,
  Historical,
  If,
  SidebarItem,
  Table,
  formatProgression,
} from "#components";
import {
  FormattedGame,
  GameMode,
  WoolWarsModes,
  WoolWarsOverall,
} from "@statsify/schemas";

export interface WoolWarsProfileProps extends BaseProfileProps {
  mode: GameMode<WoolWarsModes>;
}

export const WoolWarsProfile = ({
  skin,
  player,
  background,
  logo,
  user,
  badge,
  mode,
  t,
  time,
}: WoolWarsProfileProps) => {
  const { woolwars } = player.stats;
  const stats = woolwars[mode.api];

  const sidebar: SidebarItem[] = [
    [t("stats.wool"), t(woolwars.coins), "§6"],
    [t("stats.layers"), `${t(woolwars.layers)}§8/§a${t(100)}`, "§a"],
    [t("stats.woolPlaced"), t(stats.woolPlaced), "§e"],
    [t("stats.blocksBroken"), t(stats.blocksBroken), "§c"],
    [t("stats.powerups"), t(stats.powerups), "§b"],
  ];

  return (
    <Container background={background}>
      <Header
        skin={skin}
        name={player.prefixName}
        badge={badge}
        sidebar={sidebar}
        title={`§l${FormattedGame.WOOLWARS} §fStats §r(${mode.formatted})`}
        description={`§7${t("stats.level")}: ${
          woolwars.levelFormatted
        }\n${formatProgression({
          t,
          label: t("stats.progression.exp"),
          progression: woolwars.progression,
          currentLevel: woolwars.levelFormatted,
          nextLevel: woolwars.nextLevelFormatted,
        })}`}
        time={time}
      />
      <Table.table>
        <If condition={mode.api === "overall"}>
          {() => {
            const overall = stats as WoolWarsOverall;
            return (
              <Table.tr>
                <Table.td title={t("stats.wins")} value={t(overall.wins)} color="§a" />
                <Table.td
                  title={t("stats.losses")}
                  value={t(overall.losses)}
                  color="§c"
                />
                <Table.td title={t("stats.wlr")} value={t(overall.wlr)} color="§6" />
              </Table.tr>
            );
          }}
        </If>
        <Table.tr>
          <Table.td title={t("stats.kills")} value={t(stats.kills)} color="§a" />
          <Table.td title={t("stats.deaths")} value={t(stats.deaths)} color="§c" />
          <Table.td title={t("stats.kdr")} value={t(stats.kdr)} color="§6" />
          <Table.td title={t("stats.assists")} value={t(stats.assists)} color="§e" />
        </Table.tr>
        <Historical.progression
          time={time}
          progression={woolwars.progression}
          current={woolwars.levelFormatted}
          next={woolwars.nextLevelFormatted}
          t={t}
          level={woolwars.level}
          exp={woolwars.exp}
        />
      </Table.table>
      <Footer logo={logo} user={user} />
    </Container>
  );
};
