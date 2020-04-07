import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  container: css`
    background-color: ${props.theme.palette.primary.main};
    box-shadow: 0 3px 11px 0 rgba(42, 49, 62, 0.2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 60px;
    align-items: center;
    justify-items: center;
    color: #fff;
    font-size: 1.3rem;
    font-family: ${props.theme.fontfamily};
  `,
  label: css`
    border-bottom: 2px dashed white;
  `,
  button: css`
    background-color: transparent;
    border: none;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 1.1rem;
    outline: none;
    cursor: pointer;
    transition: 150ms background-color ease;
    justify-self: flex-start;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.3);
    }
  `
});

const Header = props => {
  const style = styles(props);
  return (
    <div className={style.container}>
      <button onClick={props.onPrev} className={style.button}>
        Prev
      </button>
      <div className={style.label}>{props.label}</div>
      <button onClick={props.onNext} className={style.button}>
        Next
      </button>
    </div>
  );
};
export default withTheme(Header);

Header.defaultProps = {
  label: new Date().toISOString().split("T")[0]
};

Header.propTypes = {
  label: PropTypes.string.isRequired,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};
