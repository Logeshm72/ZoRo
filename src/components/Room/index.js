import React from "react";
import PropTypes from "prop-types";
import TimeScheduleBox from "../TimeSchedule";
import Button from "../Button";
import { css } from "react-emotion";
import { withTheme } from "emotion-theming";

const styles = props => ({
  wrapper: css`
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;
    @media (max-width: 480px) {
      border-radius: 0;
    }
  `,
  container: css`
    display: grid;
    grid-template-areas: "bar bar" "img desc" "button button";
    grid-template-columns: 150px auto;
    grid-template-rows: 20px 1fr 50px;
    grid-gap: 15px;
    padding: 30px 15px 15px 15px;
  `,
  title: css`
    grid-area: title;
    background: ${props.theme.palette.primary.main};
    margin: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    box-shadow: inset 0px 0px 59px -24px rgba(0, 0, 0, 0.75);
    font-family: ${props.theme.fontfamily};
    color: #fff;
    font-size: 1.2rem;
  `,
  timeschedule: css`
    grid-area: bar;
  `,
  image: css`
    grid-area: img;
    height: 160px;
    background: #eee;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    display: flex;
    img {
      height: 100%;
    }
  `,
  description: css`
    grid-area: desc;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    font-family: ${props.theme.fontfamily};
    color:#5a5a5a;
  `,
  button: css`
    grid-area: button;
  `
});

const Room = props => {
  const style = styles(props);
  return (
    <div className={style.wrapper}>
      <p className={style.title}>Room {props.name}</p>
      <div className={style.container}>
        <TimeScheduleBox
          className={style.timeschedule}
          availables={props.availables}
        />
        <div className={style.image}>
          <img
            alt="room-img"
            src={`https://challenges.1aim.com/roombooking/${props.image}`}
          />
        </div>
        <div className={style.description}>
          <span>Location: {props.location}</span>
          <span>Capacity: {props.capacity}</span>
          <span>
            Equipment:
            {props.equipment.map((item, index) => {
              let comma = props.equipment.length !== index + 1 ? ", " : "";
              return (
                <span key={`equipment-${index}`}>{`${item}${comma}`}</span>
              );
            })}
          </span>
        </div>
        <Button
          name={props.name}
          onClick={() =>
            props.onClick({
              name: props.name,
              availables: props.availables
            })
          }
          className={style.button}
        >
          Book now
        </Button>
      </div>
    </div>
  );
};

export default withTheme(Room);

Room.propTypes = {
  availables: PropTypes.array,
  capacity: PropTypes.number,
  equipment: PropTypes.array,
  image: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
};
