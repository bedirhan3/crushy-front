import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import generalService from '../services/generalService';
import { toast } from 'react-toastify';

// Kullanıcıları getir
export const fetchUsers = createAsyncThunk(
    'general/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await generalService.getUsers(token);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Kullanıcı verileri alınamadı';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Kullanıcı sil
export const deleteUser = createAsyncThunk(
    'general/deleteUser',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            await generalService.deleteUser(userId, token);
            toast.success('Kullanıcı başarıyla silindi');
            return userId;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Kullanıcı silinemedi';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Yeni kullanıcı oluştur
export const createUser = createAsyncThunk(
    'general/createUser',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await generalService.createUser(userData, token);
            toast.success('Kullanıcı başarıyla oluşturuldu');
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Kullanıcı oluşturulamadı';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Kullanıcı güncelle
export const updateUser = createAsyncThunk(
    'general/updateUser',
    async ({ userId, userData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await generalService.updateUser(userId, userData, token);
            toast.success('Kullanıcı başarıyla güncellendi');
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Kullanıcı güncellenemedi';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Kullanıcı detayını getir
export const fetchUserById = createAsyncThunk(
    'general/fetchUserById',
    async (userId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const response = await generalService.getUserById(userId, token);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Kullanıcı detayı alınamadı';
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    users: [],
    filteredUsers: [],
    selectedUsers: [],
    currentUser: null,
    isLoading: false,
    isLoadingUser: false,
    error: null
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setFilteredUsers: (state, action) => {
            state.filteredUsers = action.payload;
        },
        toggleSelectUser: (state, action) => {
            const userId = action.payload;
            if (state.selectedUsers.includes(userId)) {
                state.selectedUsers = state.selectedUsers.filter(id => id !== userId);
            } else {
                state.selectedUsers.push(userId);
            }
        },
        selectAllUsers: (state, action) => {
            const allSelected = action.payload;
            if (allSelected) {
                state.selectedUsers = state.filteredUsers.map(user => user.id);
            } else {
                state.selectedUsers = [];
            }
        },
        resetSelectedUsers: (state) => {
            state.selectedUsers = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Kullanıcıları getir
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.filteredUsers = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Kullanıcı sil
            .addCase(deleteUser.fulfilled, (state, action) => {
                const userId = action.payload;
                state.users = state.users.filter(user => user.id !== userId);
                state.filteredUsers = state.filteredUsers.filter(user => user.id !== userId);
                state.selectedUsers = state.selectedUsers.filter(id => id !== userId);
            })
            // Yeni kullanıcı oluştur
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.filteredUsers = state.users;
            })
            // Kullanıcı güncelle
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user.id === updatedUser.id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                    state.filteredUsers = state.users;
                }
            })
            // Kullanıcı detayını getir
            .addCase(fetchUserById.pending, (state) => {
                state.isLoadingUser = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoadingUser = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoadingUser = false;
                state.error = action.payload;
            });
    }
});

export const { setFilteredUsers, toggleSelectUser, selectAllUsers, resetSelectedUsers } = generalSlice.actions;
export default generalSlice.reducer;