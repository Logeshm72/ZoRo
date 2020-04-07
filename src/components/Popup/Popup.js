import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  background: css`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 150ms all ease;
    ${!props.open && hide};
  `,
  container: css`
    width: 500px;
    display: grid;
    grid-template-rows: 50px auto 70px;
    background-color: #fff;
    border-radius:4px;
    overflow: hidden;
    @media (max-width: 480px) {
      width: 100%;
      height: 100%;
    }
  `,
  header: css`
    background-color: ${props.theme.palette.primary.main};
    display: grid;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: ${props.theme.fontfamily};
  `,
  content: css`
    display: grid;
    grid-template-rows: repeat(4, 40px);
    padding: 15px;
    grid-gap: 15px;
  `,
  button: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    padding: 15px;
  `
});

const hide = css`
  opacity: 0;
  pointer-events: none;
  z-index:-9;
`;

const Popup = props => {
  const style = styles(props);
  return (
    <div
      className={style.background}
      onClick={props.onClose}
      onSubmit={props.onSubmit}
    >
      <form className={style.container} onClick={e => e.stopPropagation()}>
        <div className={style.header}>
          <span>{props.title}</span>
        </div>
        <div className={style.content}>{props.children}</div>
        <div className={style.button}>
          <Button color="primary">Submit</Button>
          <Button onClick={props.onClose}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default withTheme(Popup);

Popup.defaultProps = {
  open: false,
  title: "Title"
};

Popup.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string
};
