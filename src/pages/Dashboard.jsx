import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_quantity: 0,
    low_stock_products: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await API.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Total Products</h2>
      <p>{stats.total_products}</p>

      <h2>Total Quantity</h2>
      <p>{stats.total_quantity}</p>

      <h2>Low Stock Products</h2>
      <p>{stats.low_stock_products}</p>
    </div>
  );
}

export default Dashboard;