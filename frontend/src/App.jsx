import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotList from './components/SpotList/SpotList';
import SpotDetail from './components/SpotDetail/SpotDetail';
import CreateSpot from './components/CreateSpot/CreateSpot';
import UpdateSpot from './components/CreateSpot/UpdateSpot';
import ManageSpots from './components/ManageSpots/ManageSpots';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotList />, 
      },
      {
        path: '/spots/:spotId',  
        element: <SpotDetail />,  
      },
      {
        path: '/spots/new',  // Add this route
        element: <CreateSpot />,  // Component for creating a new spot
      },
      {
        path: '/manage-spots', // Manage spots route
        element: <ManageSpots />, // Component for managing user's spots
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />, // A new component for updating spots
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;