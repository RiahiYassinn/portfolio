import matchHandler from "../../api/match.js";
import { adaptNodeHandler } from "../lib/adapt.mjs";

export const handler = adaptNodeHandler(matchHandler);
