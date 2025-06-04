import "./style/style.scss";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './utils/route-helpers/AppRoutes';

function AppContent() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      localStorage.setItem("isAuthenticated", "false");
    }
  }, []);

  return (
    <BrowserRouter>
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
