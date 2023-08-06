export default function ProgressBar(props) {
  const { completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="containerStyle">
      <div className="fillerStyles" style={fillerStyles}>
        <span className="labelStyles">{`${completed}%`}</span>
      </div>
    </div>
  );
}
