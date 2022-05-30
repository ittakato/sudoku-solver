import styles from './DifficultySelector.module.css';

const DifficultySelector = props => {
  return (
    <div className={styles.difficultySelectorContainer}>
      <label htmlFor="difficulty-selector">
        <select
          id="difficulty-selector"
          defaultValue="easy"
          onChange={props.onChange}
          disabled={props.disabled}
        >
          <option value="easy">EASY</option>
          <option value="medium">MEDIUM</option>
          <option value="hard">HARD</option>
        </select>
      </label>
    </div>
  );
};

export default DifficultySelector;
