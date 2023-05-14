import { waseful, Waseful } from "./main";

declare global {
  interface Window {
    waseful: Waseful;
  }
}

self.waseful = waseful;
