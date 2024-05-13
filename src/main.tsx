import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./Home.tsx";
import App from "./App.tsx";
import Test from "./components/Test.tsx";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

const myRepositoryName = "yusu_webapp";

const router = createBrowserRouter([
  {
    path: "/" + myRepositoryName + "/",
    element: <Home />
  },
  {
    path:"/App",
    element: <App />
  },
  {
    path: "/Test",
    element: <Test />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
