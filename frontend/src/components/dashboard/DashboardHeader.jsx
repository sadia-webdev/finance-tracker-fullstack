import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { useNavigate } from "react-router";
import useAuthStore from "../../lib/store/AuthStore";

const DashboardHeader = () => {
  const { clearAuth, user } = useAuthStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (confirm("are you sure to logout")) {
      clearAuth();
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className='bg-card border-b border-border    shadow-sm'>
      <div className='w-full  px-12 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
            <DollarSign className='h-4 w-4 text-primary-foreground' />
          </div>
          <h1 className='text-xl hidden md:block  font-semibold text-foreground'>
            Finance Tracker{" "}
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          <span className='text-muted-foreground'>
            Welcome,{" "}
            <b className='text-foreground font-medium ml-1'>{user.name}</b>
          </span>

          <Button
            className='cursor-pointer'
            variant='outline'
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
