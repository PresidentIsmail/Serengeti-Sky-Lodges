import React from "react";

import Heading from "@/components/ui/Heading";
import SettingsForm from "@/components/forms/SettingsForm";

const Settings = () => {
  return (
    <div className="flex h-full flex-col items-start gap-8 lg:items-center ">
      <h1 className="ml-8 text-4xl font-bold lg:ml-0 lg:text-5xl">Settings</h1>
      <SettingsForm />
    </div>
  );
};

export default Settings;
