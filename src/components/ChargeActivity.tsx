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
          <p className="text-lg">{Name}</p>
          <p className="text-xs">{Time}</p>
        </div>

        <div className={styles.chargeCat}>{Category}</div>
        {Category == "Income" ? (
          <div className={`${styles.chargeAmount} text-blue-600`}>
            ${Amount} MXN
          </div>
        ) : (
          <div className={`${styles.chargeAmount} text-red-600`}>
            ${Amount} MXN
          </div>
        )}
      </div>
    </>
  );
}
