"use client";
import { MenuIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const [showMenu, handler] = useDisclosure();

  return (
    <div className="block lg:hidden">
      <Button variant={"ghost"} onClick={handler.toggle}>
        {showMenu ? <X /> : <MenuIcon />}
      </Button>

      <div
        className={cn(
          "overlay bg-black/30 absolute top-full left-0 w-full transition-all ease-in-out duration-300",
          {
            "opacity-100 max-h-screen": showMenu,
            "opacity-0 h-0": !showMenu,
          }
        )}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo veniam
        provident, debitis, quibusdam, harum doloremque ea nam inventore sunt
        nesciunt voluptates nulla? Ipsa eveniet dicta eius tenetur voluptatem
        ratione ut.
      </div>
    </div>
  );
}
