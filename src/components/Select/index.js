import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const styles = {
  container: css`
    border: none;
    height: 100%;
    outline: none;
    font-size: 1rem;
  `
};

const Select = props => {
  return (
    <select
      onChange={props.onChange}
      value={props.value}
      className={styles.container}
      required={props.required}
    >
      {props.children}
    </select>
  );
};

export default Select;

Select.defaultProps = {
  value: "-1"
};

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string
};
