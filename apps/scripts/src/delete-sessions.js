/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { config } from "@statsify/util";
import { connect } from "mongoose";

const mongo = await connect(config("database.mongoUri"));

const session = mongo.connection.db.collection("session");

session.deleteMany().then(() => {
  console.log("Done!");
  process.exit(0);
});
