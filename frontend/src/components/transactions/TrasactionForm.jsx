import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../../lib/api/apiClient";
import { extractErrorMessages } from "../../util/errorUtila";

const TrasactionForm = ({ open = true, onOpenChange, editingTransaction }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
  });

  const handdleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingTransaction) {
      setFormValues({
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || "",
        type: editingTransaction.type || "",
        category: editingTransaction.category || "",
        date: editingTransaction.date
          ? new Date(editingTransaction.date).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormValues({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
    }

    setError(null);
  }, [editingTransaction, open]);

  const createTrasactionMutation = useMutation({
    mutationFn: async (newTransaction) => {
      const response = await api.post("/transactions", newTransaction);

      return response.data;
    },
    onSuccess: (data) => {
      console.log("data created", data);
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onOpenChange?.(false);
      setFormValues({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to create transaction");
      const message = extractErrorMessages(error);
      toast.error(message || "Something went wrong");
      onOpenChange?.(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTransaction) => {
      const response = await api.put(
        `/transactions/${editingTransaction._id}`,
        updatedTransaction,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data updated", data);
      toast.success("Transaction updated successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onOpenChange?.(false);
      setFormValues({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to update transaction");
      const message = extractErrorMessages(error);
      toast.error(message || "Something went wrong");
      onOpenChange?.(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.type) {
      setError("Please select a transaction type.");
      return;
    }

    if (isNaN(formValues.amount) || Number(formValues.amount) <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (!formValues.title.trim() || !formValues.category.trim()) {
      setError("Title and Category cannot be empty.");
      return;
    }

    const transactionData = {
      title: formValues.title,
      amount: Number(formValues.amount),
      type: formValues.type,
      category: formValues.category,
      date: formValues.date ? new Date(formValues.date) : new Date(),
    };

    if (editingTransaction) {
      updateMutation.mutate(transactionData);
    } else {
      createTrasactionMutation.mutate(transactionData);
    }
  };
  const handleCancel = () => {
    onOpenChange?.(false);
  };

  const isLoading =
    createTrasactionMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-125'>
        {error && <div className='mb-4 text-sm text-red-600'>{error}</div>}
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold '>
            {open && editingTransaction
              ? "Edit Transaction"
              : "Create New Transaction"}
          </DialogTitle>

          <DialogDescription>
            Fill the details below to create a new transaction
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
          {/* title  */}
          <div className='space-y-2'>
            <Label>Title *</Label>
            <Input
              id='title'
              name='title'
              type='text'
              placeholder='Enter transaction title'
              required
              value={formValues.title}
              onChange={handdleInputChange}
            />
          </div>
          {/* amount */}
          <div className='space-y-2'>
            <Label>amount *</Label>
            <Input
              id='amount'
              name='amount'
              type='number'
              placeholder='Enter transaction amount'
              required
              value={formValues.amount}
              onChange={handdleInputChange}
            />
          </div>

          {/* type */}
          <div className='space-y-2'>
            <Select
              value={formValues.type}
              name='type'
              onValueChange={(value) =>
                setFormValues({ ...formValues, type: value })
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='income'>Income</SelectItem>
                <SelectItem value='expense'>Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* category  */}
          <div className='space-y-2'>
            <Select
              value={formValues.category}
              name='category'
              onValueChange={(value) =>
                setFormValues({ ...formValues, category: value })
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Food'>Food</SelectItem>
                <SelectItem value='Transport'>Transport</SelectItem>
                <SelectItem value='Entertainment'>Entertainment</SelectItem>
                <SelectItem value='Job'>Job</SelectItem>
                <SelectItem value='Rent'>Rent</SelectItem>
                <SelectItem value='Shopping'>Shopping</SelectItem>
                <SelectItem value='Health'>Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* date  */}
          <div className='space-y-2'>
            <Label>Date *</Label>

            <Input
              id='date'
              name='date'
              type='date'
              value={formValues.date}
              onChange={handdleInputChange}
            />
          </div>

          <DialogFooter className='flex justify-end space-x-2'>
            <Button type='button' variant='outline' onClick={handleCancel}>
              Cancel
            </Button>

            <Button type='submit'>
              {isLoading
                ? "Saving..."
                : open && editingTransaction
                ? "Update Transaction"
                : "Create Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrasactionForm;
