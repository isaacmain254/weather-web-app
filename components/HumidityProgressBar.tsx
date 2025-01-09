// Humidity progress bar component
const HumidityProgressBar = ({ value }: { value: number }) => (
  <div className="w-full">
    <progress className="progress w-full" value={value} max="100"></progress>
    <div className="flex justify-between text-xs">
      <span>0</span>
      <span>{value}</span>
      <span>100</span>
    </div>
  </div>
);

export default HumidityProgressBar;
