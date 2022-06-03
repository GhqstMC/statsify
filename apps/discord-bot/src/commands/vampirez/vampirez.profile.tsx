import { Container, Footer, Header, HeaderBody, SidebarItem, Table } from '#components';
import { LocalizeFunction } from '@statsify/discord';
import { JSX } from '@statsify/rendering';
import { VampireZLife } from '@statsify/schemas';
import { prettify } from '@statsify/util';
import { BaseProfileProps } from '../base.hypixel-command';

interface VampireZColumnProps {
  mode: string;
  stats: VampireZLife;
  t: LocalizeFunction;
}

const VampireZColumn: JSX.FC<VampireZColumnProps> = ({ mode, stats, t }) => {
  return (
    <Table.ts title={`§6${prettify(mode)}`}>
      <Table.td title={t(`stats.wins`)} value={t(stats.wins)} color="§e" />
      <Table.td title={t(`stats.kills`)} value={t(stats.kills)} color="§a" />
      <Table.td title={t(`stats.deaths`)} value={t(stats.deaths)} color="§c" />
      <Table.td title={t(`stats.kdr`)} value={t(stats.kdr)} color="§6" />
    </Table.ts>
  );
};
export const VampireZProfile: JSX.FC<BaseProfileProps> = ({
  skin,
  player,
  background,
  logo,
  premium,
  badge,
  t,
}) => {
  const { vampirez } = player.stats;

  const sidebar: SidebarItem[] = [[t('stats.coins'), t(vampirez.coins), '§6']];

  return (
    <Container background={background}>
      <Header skin={skin} name={player.prefixName} badge={badge} sidebar={sidebar}>
        <HeaderBody title={`§l§cVampire§7Z §fStats`} description={`description`} />
      </Header>
      <Table.table>
        <Table.tr>
          <VampireZColumn mode="overall" stats={vampirez.overall} t={t} />
          <VampireZColumn mode="human" stats={vampirez.human} t={t} />
          <VampireZColumn mode="vampire" stats={vampirez.vampire} t={t} />
        </Table.tr>
      </Table.table>
      <Footer logo={logo} premium={premium} />
    </Container>
  );
};
