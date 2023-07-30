import { Button } from "../ui/button";

const ContextMenuButton = ({ onClick, icon: Icon, label, children }) => {
  // Convert label to lowercase and capitalize first letter
  const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Button
      onClick={onClick}
      size="sm"
      className="flex justify-start gap-2 bg-white px-6 py-6 text-base font-semibold text-gray-500 transition hover:bg-neutral-100"
    >
      <span className="">{children}</span>
      <span className="text-gray-500">{formattedLabel}</span>
    </Button>
  );
};

export default ContextMenuButton;
