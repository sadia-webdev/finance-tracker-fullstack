import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import CardStatus from "./CardStatus";

const DashboardWelcome = ({ OnCreateTransaction, setShowCreateForm, data  }) => {



  return (
    <Card className='border-0  shadow-sm bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950'>
      <CardHeader>
        <div className='flex flex-col  sm:flex-row justify-between items-start md:items-center gap-4'>
          <div className='flex flex-col items-start space-y-2'>
            <CardTitle className='text-2xl'>Overview</CardTitle>

            <CardDescription className='text-base'>
              Here you can manage and track all your transactions in one place.
            </CardDescription>
          </div>

          <Button className='cursor-pointer' onClick={OnCreateTransaction}>
            <Plus /> new transaction
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* card status */}
        <CardStatus data={data} />
      </CardContent>
    </Card>
  );
};

export default DashboardWelcome;
