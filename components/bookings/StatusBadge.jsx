import { Badge } from "../ui/badge";

// custom bagde design based on status:
const StatusBadge = ({ children }) => {
  const statusStyles = {
    unconfirmed: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      textContent: "Unconfirmed",
    },
    confirmed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
      textContent: "Confirmed",
    },
    "checked-in": {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      textContent: "Checked In",
    },
    "checked-out": {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      textContent: "Checked Out",
    },
    cancelled: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      textContent: "Cancelled",
    },
    default: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
      textContent: "Unconfirmed",
    },
  };

  const status = children.toLowerCase();
  const { bg, text, border, textContent } =
    statusStyles[status] || statusStyles["default"];

  return (
    <Badge className={`${bg} ${text} min-w-max border ${border} `}>
      {textContent}
    </Badge>
  );
};

export default StatusBadge;
