
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const defaultImg = "img/default-avatar.jpg";

const Profile = () => {
  return (
    <Card className="py-8">
      <CardContent className="space-y-6">
        {/* avatar */}
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={defaultImg}
            alt="profile image"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>

        {/* name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>

        {/* email */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-4">Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;
