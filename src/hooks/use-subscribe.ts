import { IAvaiableEvents } from "@/lib/events";
import {
  Topic,
  TopicListener,
  listen,
  useEventBroker,
} from "@/store/event-broker";
import { useCallback, useEffect, useState } from "react";

export const useSubscribe = (
  topic: IAvaiableEvents,
  listenerCb: TopicListener
) => {
  const currentTopic = useCallback(
    (evTopic: Topic) => evTopic.name === topic,
    [topic]
  );

  // Listen to next events if is mounted
  useEffect(() => {
    const usub = useEventBroker.subscribe((listener) => {
      const topicQueue = listener.topics.find(currentTopic)?.queue;

      if (topicQueue?.length ?? 0 > 0) {
        listen(topic, listenerCb);
      }
    });
    return () => {
      usub();
    };
  }, [currentTopic, listenerCb, topic]);

  // First mount
  useEffect(() => {
    const state = useEventBroker.getState().topics.find(currentTopic)?.queue;
    if (state?.length ?? 0 > 0) {
      listen(topic, listenerCb);
    }
  }, []);
};
