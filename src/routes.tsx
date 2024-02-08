import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { DeliverQueuePage } from "./pages/CookQueue/CookQueuePage";
import { BuyPage } from "./pages/Buy";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<Navigate to="/buy" replace />} />
      <Route path="/buy" element={<BuyPage />} />
      <Route path="/kitchen/status" element={<DeliverQueuePage />} />
      <Route
        path="/kitchen/authorized"
        element={<DeliverQueuePage role="DELIVERER" />}
      />
    </>
  )
);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
