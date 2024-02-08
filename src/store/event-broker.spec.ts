import { act, renderHook } from "../__tests__/utils";
import { useEventBroker } from "./event-broker";

const initialState = useEventBroker.getState();

describe(useEventBroker, () => {
  beforeEach(() => {
    useEventBroker.setState({
      topics: [...initialState.topics],
    });
  });

  test("should notify a topic", () => {
    const { result } = renderHook(() => useEventBroker());

    expect(result.current.topics.length).toBe(0);

    act(() => {
      result.current.notify(
        "PRODUCT_PROCESSED",
        JSON.stringify({
          name: "alyson",
          age: "24",
        })
      );
    });

    expect(result.current.topics.length).toBe(1);
  });

  test("should list a topic and reset value", () => {
    const { result } = renderHook(() => useEventBroker());

    expect(result.current.topics.length).toBe(0);

    act(() => {
      result.current.notify(
        "PRODUCT_PROCESSED",
        JSON.stringify({
          name: "topic-1",
          age: "24",
        })
      );
    });

    expect(result.current.topics.length).toBe(1);
    expect(
      result.current.topics.find((i) => i.name === "PRODUCT_PROCESSED")?.queue
        .length
    ).toBe(1);

    let state: string[] = [];
    expect(state.length).toBe(0);

    act(() => {
      const handleReceive = (resData: string[]) => {
        state = resData;
      };
      result.current.listen("PRODUCT_PROCESSED", handleReceive);
    });

    expect(result.current.topics.length).toBe(1);
    expect(
      result.current.topics.find((i) => i.name === "PRODUCT_PROCESSED")?.queue
        .length
    ).toBe(0);
    expect(state.length).toBe(1);
  });
});
