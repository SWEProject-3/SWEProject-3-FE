import styles from './button.module.css';

function Button({ children, color, onClick }) {
  const style = color === 'blue' ? styles.blue : styles.red;

  return (
    <button className={`${styles.button} ${style}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
