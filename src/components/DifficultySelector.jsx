const DifficultySelector = props => {
  return (
    <select
      id='difficulty-selector'
      defaultValue="easy"
      onChange={props.onChange}
      disabled={props.disabled}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
};

export default DifficultySelector;
