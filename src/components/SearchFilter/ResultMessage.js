import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  container: css`
    background-color: ${props.theme.palette[props.color].main}2e;
    height: 50px;
    text-align: left;
    line-height: 50px;
    padding-left: 15px;
    font-family: ${props.theme.fontfamily};
    color: ${props.theme.palette[props.color].dark};
    border-radius: 4px;
  `
});

const ResultMessage = props => {
  const style = styles(props);
  return <div className={style.container}>{props.text}</div>;
};

export default withTheme(ResultMessage);

ResultMessage.defaultProps = {
  color: "primary",
  text: ""
};

ResultMessage.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string
};
