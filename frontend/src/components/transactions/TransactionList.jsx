import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionCard from "./TransactionCard";

const TransactionList = ({transactions, setEditingTransaction, onEdit}) => {
  const [searchTerm, setSearchTerm] = useState("");


  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <section className='mt-8 px-8'>
      {/* search input  */}
      <div className=' flex items-center mb-4 gap-4'>
        <div className='max-w-md relative flex-1'>
          <Search className='text-muted-foreground  absolute top-1/2 left-3  transform -translate-y-1/2 w-4 h-4' />
          <Input
            type='text'
            placeholder='Search transactions...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue='all' className='w-full mt-8'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='all' className='flex items-center gap-2'>
            All
            <Badge variant='secondary'>{transactions?.length || 0}</Badge>
          </TabsTrigger>

          <TabsTrigger value='income' className='flex items-center gap-2'>
            Income
            <Badge variant='secondary'>
              {transactions?.filter((t) => t.type === "income").length || 0}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value='expense' className='flex items-center gap-2'>
            Expense
            <Badge variant='secondary'>
              {transactions?.filter((t) => t.type === "expense").length || 0}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <TransactionCard
            transactions={filteredTransactions}
            onEdit={onEdit}
          />
        </TabsContent>
        <TabsContent value='income'>
          <TransactionCard
            transactions={filteredTransactions?.filter(
              (t) => t.type === "income",
            )}
            onEdit={onEdit}
          />
        </TabsContent>
        <TabsContent value='expense'>
          <TransactionCard
            transactions={filteredTransactions?.filter(
              (t) => t.type === "expense",
            )}
            onEdit={onEdit}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TransactionList;
