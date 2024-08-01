import Image from "next/image";
import incomeIcon from "/public/assets/icons/incomes-black.png";
import expenseIcon from "/public/assets/icons/expenses-black.png";
import totalBalanceIcon from "/public/assets/icons/balance-black.png";
import savedGoalsIcon from "/public/assets/icons/piggy-bank.png";
import {
  getTotalBalance, // BORRAR API
  getMonthlyGeneralBalance, // BORRAR API
} from "@/Backend/Transaction";
import { getTotalSavedGoals } from "@/Backend/Goal";
import styles from "./TopCard.module.css";

// Types declaration
type TotalAmountsType = {
  incomes: number;
  expenses: number;
  totalBalance: number;
};

type GoalsTotalSavedType = {
  totalGoalsAmount: number;
  totalSaved: number;
};

type TopCardProps = {
  User: string;
};
// =================

const TopCard: React.FC<TopCardProps> = async ({ User }) => {
  // Fetching all necessary data from the server
  const [balanceTotal, generalBalance, goalsTotal] = await Promise.all([
    getTotalBalance(User),
    getMonthlyGeneralBalance(User),
    getTotalSavedGoals(User),
  ]);

  const totalAmounts: TotalAmountsType = {
    incomes: generalBalance.t_incomes || 0,
    expenses: generalBalance.t_expenses || 0,
    totalBalance: balanceTotal.totalBalance,
  };

  const goalsTotalSaved: GoalsTotalSavedType = {
    totalGoalsAmount: goalsTotal.totalGoalsAmount,
    totalSaved: goalsTotal.totalSaved,
  };

  return (
    <div className={styles.container}>
      {[
        { icon: incomeIcon, amount: totalAmounts.incomes.toFixed(2), label: "Incomes" },
        {
          icon: expenseIcon,
          amount: totalAmounts.expenses.toFixed(2),
          label: "Expenses",
        },
        {
          icon: totalBalanceIcon,
          amount: totalAmounts.totalBalance.toFixed(2),
          label: "Total Balance",
        },
        {
          icon: savedGoalsIcon,
          amount: goalsTotalSaved.totalSaved,
          total: goalsTotalSaved.totalGoalsAmount,
          label: "Total Savings - MXN",
        },
      ].map(({ icon, amount, total, label }, index) => (
        <>
          <div className={`${styles.topCards}`}>
            <Image src={icon} alt={`${label} Icon`} width={50} height={50} />
            <div>
              {icon === savedGoalsIcon ? (
                <p>
                  ${amount || 0} of ${total || 0}
                </p>
              ) : (
                <p>${amount || 0} MXN</p>
              )}
              <p>{label}</p>
            </div>
          </div>
          {index !== 3 && <span className={styles.separator} />}
        </>
      ))}
    </div>
  );
};

export default TopCard;
