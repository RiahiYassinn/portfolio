import chatHandler from "../../api/chat.js";
import { adaptNodeHandler } from "../lib/adapt.mjs";

export const handler = adaptNodeHandler(chatHandler);
