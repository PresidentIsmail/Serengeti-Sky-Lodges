// icons and components
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ title, value, children }) => {
  return (
    <Card className="flex tems-center gap-4 px-2 py-2 xl:py-4">
      {/* icon */}
      <div className="">{children}</div>

      <div className="flex w-full flex-col">
        {/* title */}
        <h4 className=" text-xl font-semibold">{title}</h4>
        {/* value */}
        <h3 className=" text-xl xl:text-2xl font-bold">{value}</h3>
      </div>
    </Card>
  );
};

export default StatCard;
