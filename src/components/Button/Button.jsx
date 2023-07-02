import css from './Button.module.css';
import PropTypes from 'prop-types'; // ES6

const Button = ({ handleLoadMore }) => {
  const handleClick = () => {
    handleLoadMore();
  };

  return (
    <button type="button" className={css.button} onClick={handleClick}>
      Завантажити ще
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
