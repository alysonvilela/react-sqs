import "use-broadcast-ts";
import * as zustand from "zustand";

declare module "use-broadcast-ts" {
  export type StateCreator = zustand.StateCreator;
}
