export enum EAvailableEvents {
  PRODUCT_PROCESSED,
  DELIVER_FINISHED,
  DELIVER_FINISHED_RETIRED,
}

export type IAvaiableEvents = keyof typeof EAvailableEvents;
