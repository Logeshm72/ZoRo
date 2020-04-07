import React from "react";
import PropTypes from "prop-types";
import { timesToObject } from "../../helpers/timeschedule";
import { cx, css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  container: css`
    background-color: ${props.theme.palette.error.main};
    position: relative;
    height: 20px;
  `,
  bar: css`
    height: 100%;
    display: inline-block;
    /* border-right: 1px solid ${`${props.theme.palette.error.dark}`}; */
    box-sizing: border-box;
    position: relative;
    box-shadow: inset 0px 0px 59px -24px rgba(0, 0, 0, 0.75);
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 60px 60px;
  `,
  barnumber: css`
    position: absolute;
    top: -20px;
    left: -5px;
    font-family: ${props.theme.fontfamily};
    color: ${props.theme.palette.grey.dark};
  `,
  activebar: css`
    position: absolute;
    height: 100%;
    top: 0;
    background-color: ${props.theme.palette.secondary.main};
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 60px 60px;
  `
});

const TimeScheduleBox = props => {
  const style = styles(props);
  const percentOfCells = 100 / (props.endHour - props.startHour);
  const availableTimesBars = allAvailableTimes(
    props.startHour,
    props.endHour,
    percentOfCells,
    style
  );
  const activeTimesObj = timesToObject(props.availables);
  const activeTimesBars = allActiveTimesBars(
    activeTimesObj,
    percentOfCells,
    props.startHour,
    style.activebar
  );

  return (
    <div className={cx(style.container, props.className)}>
      {availableTimesBars}
      {activeTimesBars}
    </div>
  );
};

export default withTheme(TimeScheduleBox);

TimeScheduleBox.defaultProps = {
  startHour: 7,
  endHour: 19
};
TimeScheduleBox.propTypes = {
  className: PropTypes.string,
  endHour: PropTypes.number,
  availables: PropTypes.array,
  startHour: PropTypes.number
};

const allAvailableTimes = (start, end, percentOfCells, style) => {
  let items = [];
  for (let i = start; i < end; i++) {
    items.push(
      <div
        key={`schedule-bar-${i}`}
        id={i}
        className={cx(
          style.bar,
          css`
            width: ${`${percentOfCells}%`};
          `
        )}
      >
        <span className={style.barnumber}>{i}</span>
      </div>
    );
  }
  items.push(
    <span
      className={cx(
        style.barnumber,
        css`
          left: unset;
          right: -5px;
        `
      )}
    >
      {end}
    </span>
  );
  return items;
};

const allActiveTimesBars = (array, percentOfCells, startHour, style) => {
  let activeBars = [];
  array.forEach((item, index) => {
    const hourCells = (item.lastHour - item.firstHour) * 4;
    const minCells = (item.lastMin - item.firstMin) / 15;
    const cellsOfCells = percentOfCells / 4;
    const cellWidth = (hourCells + minCells) * cellsOfCells;
    const dist1 = (item.firstHour - startHour) * 4;
    const dist2 = item.firstMin / 15;
    const finalDist = dist1 + dist2;
    const cellLeft = finalDist * cellsOfCells;
    activeBars.push(
      <div
        key={`active-bar-${index}`}
        className={cx(
          style,
          css`
            width: ${`${cellWidth}%`};
            left: ${`${cellLeft}%`};
          `
        )}
      />
    );
  });
  return activeBars;
};
