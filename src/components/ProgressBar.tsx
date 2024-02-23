type IncomeData = {
  completed: string;
};

export default function ProgressBar({ completed }: IncomeData) {
  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="containerStyle">
      <div className="fillerStyles" style={fillerStyles}></div>
    </div>
  );
}
