import { CardHeader } from "@/components/card-header";
import { Button } from "@/components/ui/button";
import { useSubscribe } from "@/hooks/use-subscribe";
import { useDeliverQueueStore } from "@/store/cooking-queue";
import { notify } from "@/store/event-broker";
import { cx } from "@/utils/cx";

enum ERoles {
  USER,
  DELIVERER,
  MANAGER,
}

type IRoles = keyof typeof ERoles;

interface DeliverQueuePageProps {
  role?: IRoles;
}

type DeliverQueueListItem = {
  id: string;
  name: string;
  status: "deliver" | "finished";
};

export const DeliverQueuePage = ({ role = "USER" }: DeliverQueuePageProps) => {
  const { queue, addToQueue, finishDeliver, removeFromQueue } =
    useDeliverQueueStore();

  const isStaff = role === "DELIVERER" || role === "MANAGER";

  const processedListener = (data: string[]) => {
    const parsed: DeliverQueueListItem[] = data.map((i) => ({
      id: String(JSON.parse(i).id),
      name: String(JSON.parse(i).name),
      status: "deliver",
    }));
    addToQueue(parsed);
  };

  const finishDeliverListener = (data: string[]) => {
    finishDeliver(data);
  };

  const removeFromQueueListener = (data: string[]) => {
    removeFromQueue(data);
  };

  useSubscribe("PRODUCT_PROCESSED", processedListener);
  useSubscribe("DELIVER_FINISHED", finishDeliverListener);
  useSubscribe("DELIVER_FINISHED_RETIRED", removeFromQueueListener);

  return (
    <div>
      <div className="p-4 rounded-xl bg-slate-100 h-max ">
        <CardHeader title="Deliver queue service" />
        <section className="flex flex-col gap-2">
          {[...queue]?.map((item) => {
            return (
              <div className="flex justify-between items-center" key={item.id}>
                {item.status === "finished" ? (
                  <>
                    <p
                      className={cx(
                        item.status === "finished"
                          ? "font-bold text-slate-900"
                          : ""
                      )}
                    >
                      {item.name}
                    </p>
                    {isStaff && (
                      <Button
                        onClick={() =>
                          notify("DELIVER_FINISHED_RETIRED", item.id)
                        }
                      >
                        User getted
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <p key={item.id} className="text-slate-700">
                      {item.name}
                    </p>
                    {isStaff && (
                      <Button
                        variant={"link"}
                        onClick={() => notify("DELIVER_FINISHED", item.id)}
                      >
                        Finish request
                      </Button>
                    )}
                  </>
                )}
              </div>
            );
          })}
          {!queue.length && (
            <p className="text-slate-800 text-center">
              There is no requests on going.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
