import Button from "@components/layout/Button.jsx";
import PropTypes from "prop-types";

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }){
  return <Button type="submit" { ...rest }>{ children }</Button>
}

export default Submit;