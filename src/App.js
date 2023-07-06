import { POtp } from "./pages/otp/otp";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PVerification from "./pages/verification/verification";
import { PMenu } from "./pages/menu/menu";
import PCart from "./pages/cart/Cart";
import Ptnc from "./pages/tnc/Tnc";
import Ppnp from "./pages/tnc/Pnp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <POtp></POtp>,
  },
  {
    path: "/verification",
    element: <PVerification></PVerification>,
  },
  {
    path: "/home",
    element: <PMenu></PMenu>,
  },
  {
    path: "/cart",
    element: <PCart></PCart>,
  },
  {
    path: "/pnp",
    element: <Ptnc></Ptnc>,
  },
  {
    path: "/tnc",
    element: <Ppnp></Ppnp>,
  },

]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
