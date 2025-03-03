import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

// This component is used to show a loading button
const LoadingButton = () => {
  return (
    <Button disabled>
      {/* Loader2 is a component from the lucide-react library is used to show the loading animations */}
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;
