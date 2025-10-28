import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Componet/Home'
import User from './Componet/User';
import Login from './Componet/Login';
import Alluser from './Componet/Alluser';

const appRouter = createBrowserRouter([
  {
    path: "/User",
    element: <User />
  },
  {
    path:"/login",
    element:<Login/>

  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path:"/Mydata",
    element:<Alluser/>
  }

]);

const App = () => {
  return (
    <RouterProvider router={appRouter} />
  );
};

export default App;
