// api helper functions
import { getAllSettings } from "@/supabase/settingsApi";

// components
import Loading from "@/app/loading";
import SettingsFormContent from "./SettingsFormContent";

const SettingsForm = async () => {
  const settings = await getAllSettings();

  // If the data is not yet fetched, show a loading indicator
  if (!settings) {
    return <Loading />;
  }

  return <SettingsFormContent settings={settings} />;
};

export default SettingsForm;
