import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  container: css`
    height: inherit;
    padding: 10px;
    font-size: 1.1rem;
    outline: none;
    -webkit-appearance: none;
    border: ${props.border ? "1px solid #eee" : "none"};
    border: ${props.error && `1px solid ${props.theme.palette.error.main}`};
    &::-webkit-input-placeholder {
      color: #ddd;
    }
  `
});

const Input = props => {
  const style = styles(props);
  return (
    <input
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={style.container}
      type={props.type}
      required={props.required}
      value={props.value}
    />
  );
};

export default withTheme(Input);

Input.defaultProps = {
  placeholder: "Search...",
  required: false,
  type: "text"
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
