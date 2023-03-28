import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import DashBoard from './Pages/DashBoard';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoute from './Routing/ProtectRoute';
import store, { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {

  const routes: any[] = [
    {
      path: '/',
      Component: Login,
    },
    {
      path: '/dashboard',
      Component: DashBoard
    }
  ];

  const routeComponents = routes.map((Routes: any) => {
    return (
      <Route
        key={Routes.path}
        // exact={Routes.exact ?? true}
        path={Routes.path}
        element={<ProtectedRoute component={<Routes.Component />} />}
      />
    );
  });

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Routes>{routeComponents}</Routes>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
