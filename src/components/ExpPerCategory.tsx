import { getTotalPerCategoryServer } from "@/Backend/Transaction";
import { getCategories } from "@/Backend/Category";
import styles from "./ExpPerCategory.module.css";
import ProgressBar from "@/components/ProgressBar";
import {
  filterCategories,
  calculateRoundedExpense,
  sortGastosWithCategories,
  extractSortedData,
} from "@/utils/ExpPerCategory_HelperFunctions";

type IncomeData = {
  User: string;
};

interface Category {
  id: number;
  name: string;
}

interface TotalPerCategory {
  _sum: {
    amount: number | null;
  };
  categoryId: number;
}

const getGastosUnsorted = (
  filteredCategories: Category[],
  transPerCat: TotalPerCategory[]
) => {
  const gastos: number[] = filteredCategories.map((category) => {
    const total = transPerCat.find((trans) => trans.categoryId === category.id);
    return total ? Math.abs(total._sum.amount ?? 0) : 0;
  });

  return gastos;
};

const ExpPerCategory: React.FC<IncomeData> = async ({ User }) => {
  try {
    const categories: Category[] = await getCategories();
    const transPerCat = await getTotalPerCategoryServer(User, "Monthly");
    console.log(transPerCat);

    const filteredCategories = filterCategories(categories);

    // Creates an array of Unsorted gastos
    const gastos = getGastosUnsorted(filteredCategories, transPerCat);

    // Calculate max value for the Progress Bar limit
    const roundedExpense = calculateRoundedExpense(gastos);

    // Sort expenses with corresponding categories
    const sortedGastosWithCategories = sortGastosWithCategories(
      gastos,
      filteredCategories
    );

    // Extract sorted expenses and categories
    const { gastosSorted, categoriesLabelsSorted } = extractSortedData(
      sortedGastosWithCategories
    );

    // Filter out 'Income' category
    const expenseData = {
      expenses: gastosSorted,
      categories: categoriesLabelsSorted,
      roundedTotal: roundedExpense,
    };

    return (
      <>
        <div className={styles.cashFlow}>
          <div className={styles.header}>
            <div>
              <p>Stadistics</p>
              <h2>Current Month</h2>
            </div>
          </div>
          <div className={styles.barChart}>
            {expenseData.categories.map((category, index) => (
              <div className={styles.goalInstance} key={index}>
                <div className={styles.goalTitle}>
                  <p>{category} </p>
                  <p>{expenseData.expenses[index].toString()} MXN</p>
                </div>

                <ProgressBar
                  key={index}
                  completed={(
                    (Number(expenseData.expenses[index]) /
                      Number(expenseData.roundedTotal)) *
                    100
                  ).toString()}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return <div>Error loading expense data. Please try again later.</div>;
  }
};

export default ExpPerCategory;
