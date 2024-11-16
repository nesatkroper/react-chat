import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import RetroGrid from "@/components/ui/retro-grid";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const Auth = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="relative rounded-xl ">
        <BorderBeam duration={5} size={500} borderWidth={2} />
        <CardContent className="w-[340px] p-0 shadow-2xl rounded-xl bg-opacity-100">
          <Tabs
            defaultValue="signin"
            className="w-full flex  flex-col justify-center"
          >
            <TabsList>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="px-6 py-4">
              <TabsContent value="signin">
                {/*  */}
                <Signin />
              </TabsContent>
              <TabsContent value="signup">
                {/*  */}
                <Signup />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      <RetroGrid angle={50} className="opacity-20" />
    </div>
  );
};

export default Auth;
