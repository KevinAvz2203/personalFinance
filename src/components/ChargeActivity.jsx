export default function ChargeActivity({ Name, Date, Category, Amount }) {
  return (
    <>
      <div className="charge">
        <div className="chargeData">
          <p className="text-lg">{Name}</p>
          <p className="text-xs">{Date}</p>
        </div>

        <div className="chargeCat">{Category}</div>
        <div className="chargeAmount">{Amount}</div>
      </div>
    </>
  );
}
