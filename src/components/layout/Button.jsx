import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

function Button({ children, type="button", bgColor='blue', size='md', ...rest }){
  let btnColor = {
    gray: `bg-gray-500`,
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };
  let btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-1 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
  };

  return <button type={ type } className={`${ btnColor[bgColor] } ${ btnSize[size] } text-white font-semibold ml-2 text-base hover:bg-blue-600 rounded`} { ...rest }>{ children }</button>
}

export default Button;