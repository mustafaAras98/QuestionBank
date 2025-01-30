import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  info: {uid: null, email: null, username: null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info.uid = action.payload.uid;
      state.info.email = action.payload.email;
      state.info.username = action.payload.displayName;
      state.isAuthenticated = true;
    },
    removeUser: state => {
      state.info.uid = null;
      state.info.email = null;
      state.info.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
