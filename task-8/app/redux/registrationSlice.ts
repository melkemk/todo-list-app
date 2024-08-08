import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    fullName: '',
    email: '',
    password: '',
  },
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearData: (state) => {
      state.fullName = '';
      state.email = '';
      state.password = '';
    },
  },
});

export const { setFullName, setEmail, setPassword, clearData } = registrationSlice.actions;
export default registrationSlice.reducer;
