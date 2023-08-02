import React from "react";
import DashboardFilter from "./DashboardFilter";

const DashboardHeader = ({filter}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>

      {/* filter */}
      <DashboardFilter filter={filter}/>
    </div>
  );
};

export default DashboardHeader;
