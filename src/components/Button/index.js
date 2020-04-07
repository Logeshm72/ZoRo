import React from "react";
import PropTypes from "prop-types";
import { css, cx } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  container: css`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: ${props.theme.palette[props.color].main};
    cursor: pointer;
    font-family: ${props.theme.fontfamily};
    font-size: 1rem;
    color: ${props.color !== "grey" && "#fff"};
    transition: 150ms all ease;
    &:hover {
      background-color: ${props.theme.palette[props.color].dark};
    }
  `
});

const Button = props => {
  const style = styles(props);
  return (
    <button
      className={cx(style.container, props.className)}
      name={props.name}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default withTheme(Button);

Button.defaultProps = {
  name: "button",
  color: "grey"
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
};
