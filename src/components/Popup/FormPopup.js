import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import Input from "../Input";
import Select from "../Select";
class FormPopup extends React.Component {
  state = {
    timeslot: "",
    name: "",
    email: "",
    number: ""
  };

  handleSelectBox = event => {
    this.setState({
      timeslot: event.currentTarget.value
    });
  };

  handleInput = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  handleSubmit = event => {
    const { name, email, number, timeslot } = this.state;
    event.preventDefault();
    this.props.onSubmit({
      name: name,
      email: email,
      number: number,
      timeslot: timeslot
    });
    this.setState({
      name: "",
      email: "",
      number: "",
      timeslot: ""
    });
  };

  render() {
    const props = this.props;
    return (
      <Popup
        title={props.title}
        open={props.open}
        onClose={props.onClose}
        onSubmit={this.handleSubmit}
      >
        <Input
          name="name"
          value={this.state.name}
          onChange={this.handleInput}
          placeholder="Name"
          border
          required
        />
        <Input
          name="email"
          value={this.state.email}
          onChange={this.handleInput}
          placeholder="Email"
          border
          type="email"
          required
        />
        <Input
          name="number"
          value={this.state.number}
          onChange={this.handleInput}
          placeholder="Number"
          border
          type="number"
          required
        />
        <Select
          value={this.state.timeslot}
          onChange={this.handleSelectBox}
          required
        >
          <option value="">Time slot</option>
          <option value="7:00-9:00">7:00-9:00</option>
          <option value="9:00-11:00">9:00-11:00</option>
          <option value="11:00-13:00">11:00-13:00</option>
          <option value="13:00-15:00">13:00-15:00</option>
          <option value="15:00-17:00">15:00-17:00</option>
          <option value="17:00-19:00">17:00-19:00</option>
        </Select>
      </Popup>
    );
  }
}

export default FormPopup;

FormPopup.defaultProps = {
  open: false,
  title: "Title"
};

FormPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string
};
