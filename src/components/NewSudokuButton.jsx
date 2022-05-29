import styles from './NewSudokuButton.module.css';

const NewSudokuButton = props => {
  return (
    <button
      id='new-sudoku-button'
      disabled={props.disabled}
      onClick={props.onClick}
      className={styles.newSudokuButton}
    >
      {props.children}
    </button>
  );
};

export default NewSudokuButton;
