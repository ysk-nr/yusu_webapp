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

import { UIProvider } from '@yamada-ui/react';

const my_repository_name = "yusu_webapp";

const router = createBrowserRouter([
  {
    path: "/" + my_repository_name + "/", // This is the base path of the repository
    // path: "/",
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
    <UIProvider>
      <RouterProvider router={router} />
    </UIProvider>
  </React.StrictMode>,
)
