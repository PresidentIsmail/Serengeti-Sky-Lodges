import React from "react";

import Heading from "@/components/ui/Heading";
import SettingsForm from "@/components/forms/SettingsForm";

const Settings = () => {
  return (
    <div className="flex h-full flex-col items-center gap-8 bg-white p-8">
      <Heading as="h1">
        Settings
      </Heading>
      <SettingsForm />
    </div>
  );
};

export default Settings;
