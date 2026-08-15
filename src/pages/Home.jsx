import { startTransition } from "react";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div>
      <Sidebar />

      <h1>Welcome to Inventory Management System</h1>
      <p>Select an option from the Sidebar.</p>
    </div>
  );
}

export default Home;