import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from '../services/dashboardService';
import { toast } from 'react-toastify';

// Async action creator - fetchDashboardStats
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await dashboardService.getDashboardStats(token);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Dashboard verileri alınamadı';
      toast.error(message);
      debugger;
      return thunkAPI.rejectWithValue(message);

    }
  }
);

const initialState = {
  stats: {
    totalUsers: 0,
    blockedUsers: 0,
    activeSubscriptions: 0,
    totalMatches: 0
  },
  isLoading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetStats: (state) => {
      state.stats = initialState.stats;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;