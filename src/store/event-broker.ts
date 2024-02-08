import { IAvaiableEvents } from "@/lib/events";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Topic {
  name: IAvaiableEvents;
  queue: string[];
}

export type TopicListener = (value: Topic["queue"]) => void;

interface State {
  topics: Topic[];
}

interface Actions {
  notify(topic: IAvaiableEvents, payload: string): void;
  listen(topic: IAvaiableEvents, listener: TopicListener): void;
}

const initialState: State = {
  topics: [],
};

export const useEventBroker = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      notify(topic, payload) {
        const existingTopic = get().topics.findIndex(
          (exTopics) => exTopics.name === topic
        );
        if (existingTopic > -1) {
          set((old) => {
            old.topics[existingTopic].queue.push(payload);

            return {
              topics: [...old.topics],
            };
          });
          return;
        }

        set((old) => ({
          topics: [
            ...old.topics,
            {
              name: topic,
              queue: [payload],
            },
          ],
        }));
      },

      listen(topic, listenerCb) {
        const allTopics = [...get().topics];
        const existingTopicIdx = allTopics.findIndex(
          (existing) => existing.name === topic
        );

        if (existingTopicIdx > -1) {
          listenerCb(allTopics[existingTopicIdx].queue);
          set((old) => {
            old.topics[existingTopicIdx].queue = [];
            return {
              topics: [...old.topics],
            };
          });
        }
      },
    }),
    {
      name: "events",
    }
  )
);

export const { notify, listen } = useEventBroker.getState();
