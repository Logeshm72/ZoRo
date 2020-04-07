import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";
import ToggleSwitch from "../ToggleSwitch";
import Input from "../Input";

const styles = props => ({
  container: css`
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: grid;
    grid-template-columns: auto 100px;
    grid-gap: 12px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.05);
  `
});
const SearchFilter = props => {
  const style = styles(props);
  return (
    <div className={style.container}>
      <Input
        type="search"
        onChange={props.onInputChange}
        placeholder={props.placeholder}
      />
      <ToggleSwitch onClick={props.onToggleClick} active={props.activeToggle} />
    </div>
  );
};

export default withTheme(SearchFilter);

SearchFilter.defaultProps = {
  activeToggle: false
};

SearchFilter.propTypes = {
  activeToggle: PropTypes.bool,
  onInputChange: PropTypes.func,
  onToggleClick: PropTypes.func
};
