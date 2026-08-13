import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route
      path="/users"
      element={
        <ProtectedRoute>
        <Users />
        </ProtectedRoute>
      }
      />

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
        />
        <Route path="/add-product" element={
          <ProtectedRoute>
            <AddProduct />
        
          </ProtectedRoute>
        }
      />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;