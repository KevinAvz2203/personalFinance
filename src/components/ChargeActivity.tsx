import styles from "./ChargeActivity.module.css";

type ChargeData = {
  Name: string;
  Time: string;
  Category: string;
  Amount: number;
};

export default function ChargeActivity({
  Name,
  Time,
  Category,
  Amount,
}: ChargeData) {
  return (
    <>
      <div className={styles.charge}>
        <div className={styles.chargeData}>
          <p className={`${styles.title} text-lg`}>{Name}</p>
          <p className={`${styles.time} text-xs`}>{Time}</p>
        </div>

        <div className={styles.chargeCat}>{Category}</div>
        {Category == "Income" ? (
          <div className={`${styles.chargeAmount} ${styles.income}`}>
            ${Amount} MXN
          </div>
        ) : (
          <div className={`${styles.chargeAmount} ${styles.expense}`}>
            ${Amount} MXN
          </div>
        )}
      </div>
    </>
  );
}
