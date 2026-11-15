import speechHandler from "../../api/speech.js";
import { adaptNodeHandler } from "../lib/adapt.mjs";

export const handler = adaptNodeHandler(speechHandler);
