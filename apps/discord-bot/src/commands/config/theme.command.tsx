/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import {
  ApiService,
  ChoiceArgument,
  Command,
  CommandContext,
  ErrorMessage,
  IMessage,
  LocalizeFunction,
  SubCommand,
} from "@statsify/discord";
import { DemoProfile } from "./demo.profile";
import {
  User,
  UserBoxes,
  UserFont,
  UserPalette,
  UserTheme,
  UserTier,
} from "@statsify/schemas";
import { getBackground, getLogo } from "@statsify/assets";
import { getTheme } from "#themes";
import { render } from "@statsify/rendering";

@Command({ description: (t) => t("commands.theme") })
export class ThemeCommand {
  public constructor(private readonly apiService: ApiService) {}

  @SubCommand({
    description: (t) => t("commands.theme-boxes"),
    tier: UserTier.GOLD,
    args: [
      new ChoiceArgument(
        "boxes",
        true,
        ["Default", UserBoxes.DEFAULT],
        ["HD", UserBoxes.HD],
        ["Ultra HD", UserBoxes.UHD]
      ),
    ],
  })
  public boxes(context: CommandContext) {
    const boxes = context.option<UserBoxes>("boxes");
    return this.updateField(context, "boxes", boxes);
  }

  @SubCommand({
    description: (t) => t("commands.theme-font"),
    tier: UserTier.GOLD,
    args: [
      new ChoiceArgument(
        "font",
        true,
        ["Default", UserFont.DEFAULT],
        ["HD", UserFont.HD]
      ),
    ],
  })
  public font(context: CommandContext) {
    const font = context.option<UserFont>("font");
    return this.updateField(context, "font", font);
  }

  @SubCommand({
    description: (t) => t("commands.theme-palette"),
    tier: UserTier.DIAMOND,
    args: [
      new ChoiceArgument(
        "palette",
        true,
        ["Default", UserPalette.DEFAULT],
        ["Dark", UserPalette.DARK],
        ["Light", UserPalette.LIGHT]
      ),
    ],
  })
  public palette(context: CommandContext) {
    const palette = context.option<UserPalette>("palette");
    return this.updateField(context, "palette", palette);
  }

  @SubCommand({ description: (t) => t("commands.theme-view") })
  public async view(context: CommandContext) {
    const user = context.getUser();
    const t = context.t();

    if (!user?.uuid) throw new ErrorMessage("verification.requiredVerification");

    const profile = await this.getProfile(t, user);

    return {
      content: t("config.theme.view"),
      files: [{ name: "theme.png", data: profile, type: "image/png" }],
    };
  }

  private async updateField<T extends keyof UserTheme>(
    context: CommandContext,
    field: T,
    value: UserTheme[T]
  ): Promise<IMessage> {
    const user = context.getUser();
    const t = context.t();

    if (!user?.uuid) throw new ErrorMessage("verification.requiredVerification");
    user.theme = { ...user.theme, [field]: value };

    await this.apiService.updateUser(user.id, { theme: user.theme });

    const profile = await this.getProfile(t, user);

    return {
      content: t("config.theme.set"),
      files: [{ name: "theme.png", data: profile, type: "image/png" }],
    };
  }

  private async getProfile(t: LocalizeFunction, user: User) {
    if (!user?.uuid) throw new ErrorMessage("errors.unknown");

    const [player, skin, badge, logo, background] = await Promise.all([
      this.apiService.getPlayer(user.uuid),
      this.apiService.getPlayerSkin(user.uuid),
      this.apiService.getUserBadge(user.uuid),
      getLogo(user.tier),
      getBackground("hypixel", "overall"),
    ]);

    const canvas = render(
      <DemoProfile
        background={background}
        logo={logo}
        player={player}
        skin={skin}
        badge={badge}
        tier={user.tier}
        message={t("config.theme.profile")}
      />,
      getTheme(user)
    );

    return canvas.toBuffer("png");
  }
}