import { Field } from './decorators';

export const games = [
  { name: 'Quake Craft', code: 'QUAKECRAFT', id: 2 },
  { name: 'Walls', code: 'WALLS', id: 3 },
  { name: 'Paintball', code: 'PAINTBALL', id: 4 },
  { name: 'Blitz Survival Games', code: 'SURVIVAL_GAMES', id: 5 },
  { name: 'TNT Games', code: 'TNTGAMES', id: 6 },
  { name: 'VampireZ', code: 'VAMPIREZ', id: 7 },
  { name: 'Mega Walls', code: 'WALLS3', id: 13 },
  { name: 'Arcade', code: 'ARCADE', id: 14 },
  { name: 'Arena Brawl', code: 'ARENA', id: 17 },
  { name: 'UHC', code: 'UHC', id: 20 },
  { name: 'Cops and Crims', code: 'MCGO', id: 21 },
  { name: 'Warlords', code: 'BATTLEGROUND', id: 23 },
  { name: 'Smash Heroes', code: 'SUPER_SMASH', id: 24 },
  { name: 'Turbo Kart Racers', code: 'GINGERBREAD', id: 25 },
  { name: 'Housing', code: 'HOUSING', id: 26 },
  { name: 'SkyWars', code: 'SKYWARS', id: 51 },
  { name: 'Crazy Walls', code: 'TRUE_COMBAT', id: 52 },
  { name: 'Speed UHC', code: 'SPEED_UHC', id: 54 },
  { name: 'SkyClash', code: 'SKYCLASH', id: 55 },
  { name: 'Classic Games', code: 'LEGACY', id: 56 },
  { name: 'Prototype', code: 'PROTOTYPE', id: 57 },
  { name: 'BedWars', code: 'BEDWARS', id: 58 },
  { name: 'Murder Mystery', code: 'MURDER_MYSTERY', id: 59 },
  { name: 'Build Battle', code: 'BUILD_BATTLE', id: 60 },
  { name: 'Duels', code: 'DUELS', id: 61 },
  { name: 'SkyBlock', code: 'SKYBLOCK', id: 63 },
  { name: 'Pit', code: 'PIT', id: 64 },
  { name: 'Replay', code: 'REPLAY', id: -1 },
  { name: 'Limbo', code: 'LIMBO', id: -2 },
  { name: 'Queue', code: 'QUEUE', id: -3 },
  { name: 'Main Lobby', code: 'MAIN_LOBBY', id: -4 },
  { name: 'Tournament Lobby', code: 'TOURNAMENT_LOBBY', id: -5 },
  { name: 'Idle', code: 'IDLE', id: -6 },
];

export type GameCode = typeof games[number]['code'];
export type GameId = typeof games[number]['id'];
export type GameName = typeof games[number]['name'];

export class Game {
  @Field({
    enum: games.map((g) => g.id),
    enumName: 'GameId',
    example: games[0].id,
    type: () => String,
  })
  public id: GameId;

  @Field({
    enum: games.map((g) => g.code),
    enumName: 'GameCode',
    example: games[0].code,
    type: () => String,
  })
  public code: GameCode;

  @Field({
    enum: games.map((g) => g.name),
    enumName: 'GameName',
    example: games[0].name,
    type: () => String,
  })
  public name: GameName;

  public constructor(tag: GameId | GameCode) {
    const game = games.find((g) => g.id === tag || g.code === tag)!;

    this.id = game?.id;
    this.code = game?.code;
    this.name = game?.name;
  }

  public toString() {
    return this.code;
  }
}