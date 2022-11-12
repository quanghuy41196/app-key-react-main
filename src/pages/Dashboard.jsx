import React, { useState } from 'react';


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      <h1>Dashboard</h1>

    </div>
  );
}

export default Dashboard;