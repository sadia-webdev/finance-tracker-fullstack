import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardWelcome from "../../components/dashboard/DashboardWelcome";
import SideBar from "../../components/dashboard/SideBar";
import TransactionList from "../../components/transactions/TransactionList";
import TrasactionForm from "../../components/transactions/TrasactionForm";
import api from "../../lib/api/apiClient";
import MonthlySummaryChart from "../../components/transactions/MonthlySummaryChart";

 

const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleOnCreateTransaction = () => {
    setShowCreateForm(true);
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingTransaction(null);
  };

  const queryClient = useQueryClient();

  const transactionQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions");
      return response.data;
    },
  });

  queryClient.invalidateQueries(["transactions"]);

  if (transactionQuery.isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );
  }

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowCreateForm(true);
  };

  if (transactionQuery.isError) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-500'>
          Error loading Transactions: {transactionQuery.error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* dashboard header  */}
      <DashboardHeader />

      {/* main content  */}
      <div className='sm:flex block'>
       <SideBar />
        <main className="flex-1">
          {/* welcome section */}
          <DashboardWelcome
            OnCreateTransaction={handleOnCreateTransaction}
            setShowCreateForm={setShowCreateForm}
            data={transactionQuery.data}
          />

          <MonthlySummaryChart />

          <TransactionList
            transactions={transactionQuery.data}
            setEditingTransaction={setEditingTransaction}
            onEdit={handleEditTransaction}
          />
        </main>
      </div>

      <TrasactionForm
        open={showCreateForm || !!editingTransaction}
        onOpenChange={handleFormClose}
        editingTransaction={editingTransaction}
      />

    </div>
  );
};

export default DashboardPage;
