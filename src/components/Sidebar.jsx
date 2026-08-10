import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <br /><br />

        <NavLink to="/products">Products</NavLink>
        <br /><br />

        <NavLink to="/users">Users</NavLink>
        <br /><br />

        <NavLink to="/add-product"> Add Product</NavLink>
        <br /> <br />

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default Sidebar;