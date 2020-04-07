import React, { Component } from "react";
import Header from "./components/Header";
import SearchFilter, { ResultMessage } from "./components/SearchFilter";
import Toast from "./components/Toast";
import Room from "./components/Room";
import { scheduleValidate } from "./helpers/timeschedule";
import { FormPopup } from "./components/Popup";
import { toast } from "react-toastify";
import { css } from "react-emotion";

const styles = props => ({
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 60px 60px auto;
    grid-gap: 15px;
  `,
  rooms: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  `
});

class App extends Component {
  /**
   * Application main store
   */
  state = {
    rooms: [],
    filteredRooms: [],
    roomStatus: "NoSearch",
    date: new Date(),
    activeCapacity: false,
    showPopup: false,
    selectedRoomTitle: "",
    selectedRoomAvailables: [],
  };
  /**
   * React component lifecycle
   */
  componentDidMount() {
    this.getRooms();
  }
  /**
   * Send "POST" request to the API
   */
  getRooms = () => {
    this.setState({ roomStatus: "fetching" });
    window.API.getrooms(
      this.state.date / 1000,
      this.apiSuccessful,
      this.handleError
    );
  };
  /**
   * Handling successful status of the API response
   */
  apiSuccessful = data => {
    this.setState({
      rooms: data,
      filteredRooms: data,
      roomStatus: "fethced"
    });
  };
  /**
   * Handling error status of the API response
   */
  handleError = err => {
    this.setState({
      roomStatus: "fetch failed"
    });
  };
  /**
   * Making a string format of the date
   */
  getDate = date => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${dd}-${mm}-${yyyy}`;
  };
  /**
   * Handling next date click
   */
  nextDate = () => {
    let showDate = this.state.date;
    showDate.setDate(showDate.getDate() + 1);
    this.setState(
      {
        date: showDate
      },
      () => this.getRooms()
    );
  };
  /**
   * Handling previous date click
   */
  prevDate = () => {
    let showDate = this.state.date;
    showDate.setDate(showDate.getDate() - 1);
    this.setState(
      {
        date: showDate
      },
      () => this.getRooms()
    );
  };
  /**
   * Handling search input filter functionality
   */
  handleSearch = event => {
    const value = event.target.value;
    if (!value || value === "")
      this.setState({
        filteredRooms: this.state.rooms
      });
    else {
      this.setState({
        filteredRooms: this.state.rooms.filter(s => s.name.includes(value))
      });
    }
  };
  /**
   * Handling available filter button functionality
   */
  handleCapacity = event => {
    const activeCapacity = this.state.activeCapacity;
    const rooms = this.state.rooms;
    if (!activeCapacity) {
      this.setState({
        filteredRooms: rooms.filter(s => s.capacity > 0),
        activeCapacity: !activeCapacity
      });
    } else {
      this.setState({
        filteredRooms: rooms,
        activeCapacity: !activeCapacity
      });
    }
  };
  /**
   * Handling `Book Now` button click
   */
  handleBooking = data => {
    this.setState({
      showPopup: true,
      selectedRoomTitle: `Room ${data.name}`,
      selectedRoomAvailables: data.availables
    });
  };
  /**
   * Closing popup
   */
  handleClosePopup = event => {
    event.preventDefault();
    this.setState({
      showPopup: false
    });
  };
  /**
   * Validating schedule selectbox after submitting
   */
  handleSubmit = data => {
    let isScheduleValid = scheduleValidate(
      this.state.selectedRoomAvailables,
      data.timeslot
    );
    if (isScheduleValid) {
      toast.success("The room has been booked successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
      this.setState({
        showPopup: false
      });
    } else
      toast.error("The room is full. Try another time-slot", {
        position: toast.POSITION.TOP_CENTER
      });
  };
  /**
   * React render DOM
   */
  render() {
    const style = styles(this.props);
    return [
      <FormPopup
        key="form-popup"
        title={this.state.selectedRoomTitle}
        open={this.state.showPopup}
        onClose={this.handleClosePopup}
        onSubmit={this.handleSubmit}
      />,
      <div key="main-container" className={style.container}>
        <Header
          label={this.getDate(this.state.date)}
          onNext={this.nextDate}
          onPrev={this.prevDate}
        />
        <SearchFilter
          onInputChange={this.handleSearch}
          onToggleClick={this.handleCapacity}
          activeToggle={this.state.activeCapacity}
        />
        {this.state.roomStatus === "fetching" ? (
          <ResultMessage text="Rooms are loading ..." />
        ) : this.state.filteredRooms.length > 0 ? (
          <div className={style.rooms}>
            {this.state.filteredRooms.map((item, index) => (
              <Room
                key={`room-${index}`}
                name={item.name}
                image={item.images[0]}
                location={item.location}
                capacity={item.capacity}
                availables={item.avail}
                equipment={item.equipment}
                onClick={this.handleBooking}
              />
            ))}
          </div>
        ) : (
          <ResultMessage color="error" text="Nothing has been found" />
        )}
      </div>,
      <Toast key="toast" />
    ];
  }
}

export default App;
