const CardStatus = ({ data = [] }) => {
  
  const balance = data.reduce(
    (acc, transaction) =>
      acc + transaction.amount * (transaction.type === "income" ? 1 : -1),
    0
  );

  const expense = data.reduce(
    (acc, transaction) =>
      acc + (transaction.type === "expense" ? transaction.amount : 0),
    0
  );

  const income = data.reduce(
    (acc, transaction) =>
      acc + (transaction.type === "income" ? transaction.amount : 0),
    0
  );




  const getPercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const previousIncome = 1200;
  const previousExpense = 800;
  const previousTotal = previousIncome - previousExpense;

  const incomePercent = getPercentageChange(income, previousIncome);
  const expensePercent = getPercentageChange(expense, previousExpense);
  const totalPercent = getPercentageChange(balance, previousTotal);


  const formatPercent = (value) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };


  return (
    <div className='grid grid-cols sm:grid-cols-3 gap-6  '>
      {/* Income */}
      <div className=' p-4 rounded-lg shadow-md mb-4 space-y-4 border border-border bg-background '>
        <h3 className='text-xl font-semibold text-muted-foreground'>
          Total Income
        </h3>
        <div className='flex justify-between items-end'>
          <span className='text-4xl font-semibold'>${income}</span>
          <div className='w-5 h-5  bg-green-200 p-8 py-1 rounded-full text-center flex justify-center items-center   font-bold'>
            <span className=' text-sm  text-green-400'>
              {formatPercent(incomePercent)}
            </span>
          </div>
        </div>
      </div>

      {/* expense */}
      <div className=' p-4 rounded-lg shadow-md mb-4 space-y-4 border border-border  bg-background'>
        <div className='text-xl flex justify-between font-semibold text-muted-foreground'>
          <span>Expenses</span>
        </div>

        <div className='flex justify-between items-end'>
          <span className='text-4xl font-semibold'>${expense}</span>
          <div className='w-5 h-5  bg-red-200 p-8 py-1 rounded-full text-center flex justify-center items-center   font-bold'>
            <span className=' text-sm  text-red-400'>{formatPercent(expensePercent)}</span>
          </div>
        </div>
      </div>

      {/* balance */}
      <div className=' p-4 rounded-lg shadow-md mb-4 space-y-4 border border-border  bg-background '>
        <h3 className='text-xl font-semibold text-muted-foreground'>Balance</h3>
        <div className='flex justify-between items-end'>
          <span className='text-4xl font-semibold'>${balance}</span>
          <div className='w-5 h-5  bg-blue-200 p-8 py-1 rounded-full text-center flex justify-center items-center   font-bold'>
            <span className=' text-sm  text-blue-400'>{formatPercent(totalPercent)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStatus;
