import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSeats, toggleSeat } from "./redux";
import seatData from "./danhaschghe.json";
import "./IndexRedex.scss";

const Seat = ({ seat, row, canSelect, handleSeatSelect }) => {
  const handleToggle = () => {
    if (!seat.daDat && canSelect) {
      handleSeatSelect(row, seat.soGhe);
    }
  };

  return (
    <span
      onClick={handleToggle}
      className={`seat ${
        seat.daDat
          ? "seat--reserved"
          : seat.selected
          ? "seat--selected"
          : "seat--empty"
      }`}
      style={{
        cursor: !seat.daDat && canSelect ? "pointer" : "default",
      }}
    >
      {seat.soGhe}
    </span>
  );
};

const Row = ({ row, canSelect, handleSeatSelect }) => (
  <div className="row">
    <span className="row-label">{row.hang}</span>
    {row.danhSachGhe.map((seat) => (
      <Seat
        key={seat.soGhe}
        seat={seat}
        row={row.hang}
        canSelect={canSelect}
        handleSeatSelect={handleSeatSelect}
      />
    ))}
  </div>
);

const SeatNumbers = ({ totalSeats }) => (
  <div className="seat-numbers">
    {Array.from({ length: totalSeats }, (_, i) => (
      <span key={i + 1} className="seat-number">
        {i + 1}
      </span>
    ))}
  </div>
);

export default function IndexRedux() {
  const seats = useSelector((state) => state.seats);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [seatCount, setSeatCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [allowSelection, setAllowSelection] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    dispatch(setSeats(seatData));
  }, [dispatch]);

  const handleSeatSelect = (row, seat) => {
    if (selectedSeats.length < seatCount || selectedSeats.includes(seat)) {
      dispatch(toggleSeat(row, seat));
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    } else {
      alert("You can only select the specified number of seats!");
    }
  };

  const confirmSelection = () => {
    if (name && seatCount > 0 && selectedSeats.length === seatCount) {
      setBookingData([...bookingData, { name, seatCount, selectedSeats }]);
      setName("");
      setSeatCount(0);
      setSelectedSeats([]);
      setAllowSelection(false);
    } else {
      alert(
        "Please fill in the name, select the correct number of seats, and ensure the selections are valid!"
      );
    }
  };

  const clearBookings = () => {
    setBookingData([]);
  };

  const startSelectingSeats = () => {
    if (!name || seatCount <= 0) {
      alert("Please enter a valid name and number of seats!");
    } else {
      setAllowSelection(true);
      setSelectedSeats([]);
    }
  };

  return (
    <div className="seat-booking">
      <h1>Movie Seat Selection</h1>

      <div className="form-section">
        <div className="form-group-inline">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: "black" }}
          />
          <label htmlFor="seatCount" style={{ marginLeft: "20px" }}>
            Number of Seats:
          </label>
          <input
            id="seatCount"
            type="number"
            value={seatCount}
            onChange={(e) => setSeatCount(Number(e.target.value))}
            style={{ color: "black" }}
          />
        </div>
        <button className="start-button" onClick={startSelectingSeats}>
          Start Selecting
        </button>
      </div>

      <div className="legend">
        <span>
          <span className="legend-box legend-box--selected"></span> Selected
          Seat
        </span>
        <span>
          <span className="legend-box legend-box--reserved"></span> Reserved
          Seat
        </span>
        <span>
          <span className="legend-box legend-box--empty"></span> Empty Seat
        </span>
      </div>

      <h3 style={{ textAlign: "center", color: "orange", margin: "20px 0" }}>
        Please Select your Seats NOW!
      </h3>

      {/* Dãy số trên đầu */}
      <SeatNumbers totalSeats={12} />

      <div className="seat-selection">
        {seats.map((row) => (
          <Row
            key={row.hang}
            row={row}
            canSelect={allowSelection}
            handleSeatSelect={handleSeatSelect}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "15px 40px",
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          SCREEN THIS WAY
        </button>
      </div>

      <button
        className="confirm-button"
        onClick={confirmSelection}
        disabled={!allowSelection}
      >
        Confirm Selection
      </button>

      {bookingData.length > 0 && (
        <div className="booking-details">
          <h3>Booking Details:</h3>
          <table
            className="booking-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Number of Seats
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Selected Seats
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((data, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {data.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {data.seatCount}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {data.selectedSeats.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={clearBookings}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
