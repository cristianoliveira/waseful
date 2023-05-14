import { waseful } from "./main";

declare global {
  interface Window {
    waseful: Waseful;
  }
}

self.waseful = waseful;
