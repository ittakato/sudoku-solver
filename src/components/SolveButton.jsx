import styles from './SolveButton.module.css';

const SolveButton = props => {
  return (
    <button
      id="solve-button"
      className={styles.solveButton}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default SolveButton;
