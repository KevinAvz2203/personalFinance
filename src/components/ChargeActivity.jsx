export default function ChargeActivity({ Name, Time, Category, Amount }) {
  return (
    <>
      <div className="charge">
        <div className="chargeData">
          <p className="text-lg">{Name}</p>
          <p className="text-xs">{Time}</p>
        </div>

        <div className="chargeCat">{Category}</div>
        {Category == "Income" ? (
          <div className="chargeAmount text-blue-600">${Amount} MXN</div>
        ) : (
          <div className="chargeAmount text-red-600">${Amount} MXN</div>
        )}
      </div>
    </>
  );
}
