import { useState } from "react";
import { SiteHeader } from "../../components/header";
import { DeliverQueuePage } from "../CookQueue/CookQueuePage";
import { ProfileForm } from "./create-form";
import { Button } from "@/components/ui/button";

export const BuyPage = () => {
  const [serviceStatus, setServiceStatus] = useState(true);
  return (
    <>
      <SiteHeader />
      <main>
        <div className="w-full grid grid-cols-2 gap-4 mt-4 px-4">
          <section id="form" className="p-4 bg-slate-100/80 rounded-xl">
            <ProfileForm />
          </section>
          {serviceStatus ? <DeliverQueuePage /> : <div></div>}

          <Button onClick={() => setServiceStatus((prev) => !prev)}>
            Turn Deliver Queue Service {serviceStatus ? "off" : "on"}
          </Button>
        </div>
      </main>
    </>
  );
};
