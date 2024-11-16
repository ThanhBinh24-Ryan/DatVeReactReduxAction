import { createStore } from 'redux';

// Action Types
const SET_SEATS = 'SET_SEATS';
const TOGGLE_SEAT = 'TOGGLE_SEAT';

// Action Creators
export const setSeats = (seats) => ({
  type: SET_SEATS,
  payload: seats,
});

export const toggleSeat = (row, seat) => ({
  type: TOGGLE_SEAT,
  payload: { row, seat },
});

// Initial State
const initialState = {
  seats: [],
};

// Reducer
const seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEATS:
      return { ...state, seats: action.payload };

    case TOGGLE_SEAT:
      const { row, seat } = action.payload;
      return {
        ...state,
        seats: state.seats.map((hang) =>
          hang.hang === row
            ? {
                ...hang,
                danhSachGhe: hang.danhSachGhe.map((ghe) =>
                  ghe.soGhe === seat ? { ...ghe, selected: !ghe.selected } : ghe
                ),
              }
            : hang
        ),
      };

    default:
      return state;
  }
};

// Create Redux Store
const store = createStore(seatReducer);

export default store;