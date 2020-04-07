import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  button: css`
    display: grid;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #aaa;
    color: #fff;
    transition: 150ms all ease;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    ${props.active && activeStyle(props.theme.palette[props.color].main)};
  `
});

const activeStyle = color => css`
  background-color: ${color};
`;
const ToggleSwitch = props => {
  const style = styles(props);
  return (
    <button onClick={props.onClick} className={style.button} value={props.active}>
      <span>Available</span>
    </button>
  );
};

export default withTheme(ToggleSwitch);

ToggleSwitch.defaultProps = {
  active: false,
  color: "secondary" 
};

ToggleSwitch.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.oneOf(["primary", "secondary"]),
  onClick: PropTypes.func
};
