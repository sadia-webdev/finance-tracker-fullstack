import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DotSquare, Edit2, Ellipsis, Trash, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { toast } from "sonner";

const TransactionCard = ({ transactions = [], onEdit }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (transactionId) => {
      const response = await api.delete(`/transactions/${transactionId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    },
  });

  const handleDeleteConfirm = async () => {
    try {
      await deleteMutation.mutate(selectedTransactionId);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>
              <Ellipsis className='text-muted-foreground' />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-center  text-muted-foreground'
              >
                No transactions yet
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className='font-medium'>
                  {transaction.title}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </TableCell>

                <TableCell
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount}
                </TableCell>

                <TableCell>{transaction.category}</TableCell>

                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis className='text-muted-foreground text-base font-medium cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(transaction)}>
                        <Edit2 className='mr-2' /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTransactionId(transaction._id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash className='mr-2' />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className='bg-red-600 hover:bg-red-700'
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionCard;
