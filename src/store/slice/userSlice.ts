import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Address {
  line1: string;
  line2: string;
  state: string;
  city: string;
  pin: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  linkedinUrl: string;
  gender: string;
  address: Address;
}

interface UserState {
  users: User[];
  showForm: boolean;
  editingUser: User | null;
  cities: string[];
  expanded: number[]
}

const initialState: UserState = {
  users: [],
  showForm: false,
  editingUser: null,
  cities: [],
  expanded: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setShowForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
    },
    setEditingUser(state, action: PayloadAction<User | null>) {
      state.editingUser = action.payload;
    },
    setCities(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },
    setExpanded(state, action: PayloadAction<number>){
      if(state.expanded.includes(action.payload)){
        state.expanded = state.expanded.filter((v) => v!= action.payload)
      }
      else{
        state.expanded.push(action.payload)
      }
    }
  },
});

export const { setUsers, setExpanded, setShowForm, setEditingUser, setCities } =
  userSlice.actions;

export default userSlice.reducer;
