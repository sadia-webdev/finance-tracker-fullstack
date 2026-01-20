import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SideBar from "../../components/dashboard/SideBar";
import TransactionList from "../../components/transactions/TransactionList";
import api from "../../lib/api/apiClient";

const Transactions = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);

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
    <>
      <DashboardHeader />

      {/* main content  */}
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>
          <TransactionList
            transactions={transactionQuery.data}
            setEditingTransaction={setEditingTransaction}
            onEdit={handleEditTransaction}
          />
        </main>
      </div>
    </>
  );
};

export default Transactions;
