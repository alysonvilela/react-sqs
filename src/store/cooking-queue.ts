import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shared } from "use-broadcast-ts";

const newShared = shared as unknown as typeof persist;
interface DeliverQueueListItem {
  id: string;
  name: string;
  status: "deliver" | "finished";
}

interface DeliverQueueStore {
  queue: DeliverQueueListItem[];
  addToQueue: (items: DeliverQueueListItem[]) => void;
  finishDeliver: (itemIds: string[]) => void;
  removeFromQueue: (itemIds: string[]) => void;
}

export const useDeliverQueueStore = create<DeliverQueueStore>()(
  newShared(
    persist(
      (set) => ({
        queue: [],
        addToQueue: (items) =>
          set((state) => ({ queue: [...state.queue, ...items] })),
        finishDeliver: (itemIds) =>
          set((state) => {
            const finisheds = state.queue
              .filter((item) => itemIds.includes(item.id))
              .map((i): DeliverQueueListItem => ({ ...i, status: "finished" }));
            return {
              queue: [
                ...finisheds,
                ...state.queue.filter((item) => !itemIds.includes(item.id)),
              ],
            };
          }),
        removeFromQueue: (itemIds) =>
          set((state) => ({
            queue: state.queue.filter((item) => !itemIds.includes(item.id)),
          })),
      }),
      {
        name: "kitchen",
      }
    ),
    { name: "kitchen-broadcast" }
  )
);
