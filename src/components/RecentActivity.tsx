import ChargeActivity from "./ChargeActivity";
import { getRecentPerUser } from "@/Backend/Transaction";
import styles from "./RecentActivity.module.css";

/* Types declaration */
type IncomeData = {
  User: string;
};
/* ================== */

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;

const RecentActivity: React.FC<IncomeData> = async ({ User }) => {
  const { transactions } = await getRecentPerUser(User);

  const dates = transactions.map((transaction) => {
    const d = new Date(transaction.date);
    return d.toLocaleDateString(undefined, options);
  });

  const hours = transactions.map((transaction) => {
    const d = new Date(transaction.date);
    return d.toLocaleTimeString("en-US");
  });

  const uniqueDates = Array.from(new Set(dates));
  const currDay = new Date().toLocaleDateString(undefined, options);

  return (
    <>
      <div className={styles.cashFlow}>
        <div className={styles.header}>
          <div>
            <p>Transactions</p>
            <h2>Recent Activity</h2>
          </div>
        </div>

        <div className={styles.scrollingClass}>
          {uniqueDates.length === 0 ? (
            <>
              <div>No recent transactions to show</div>
            </>
          ) : (
            <>
              {uniqueDates.map((fecha, dtindex) => (
                <div className="mb-10" key={dtindex}>
                  <div className={styles.date}>
                    {fecha == currDay ? <p>Today</p> : <p>{fecha}</p>}
                  </div>

                  {transactions.map(
                    (transaction, transId) =>
                      fecha ==
                        new Date(transaction.date).toLocaleDateString(
                          undefined,
                          options
                        ) && (
                        <ChargeActivity
                          key={transaction.id}
                          Name={transaction.description}
                          Time={hours[transId]}
                          Category={transaction.categories.name}
                          Amount={transaction.amount}
                        />
                      )
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentActivity;
