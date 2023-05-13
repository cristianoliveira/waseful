import { waseful, Waseful } from "./main";

declare global {
  interface Window {
    waseful: Waseful;
  }
}

window.waseful = waseful;
