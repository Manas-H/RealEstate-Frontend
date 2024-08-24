import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeoLocation {
  lat: number;
  lng: number;
}

interface PropertyState {
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[]; // Ensure this is an array of Base64 strings
  propertyType: string;
  status: string;
  geoLocation: GeoLocation;
  amenities?: string[];
}

const initialState: PropertyState = {
  title: "",
  description: "",
  price: 0,
  location: "",
  images: [], // Initialize as an empty array
  propertyType: "",
  status: "available",
  geoLocation: { lat: 0, lng: 0 },
  amenities: [],
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperty: (state, action: PayloadAction<Partial<PropertyState>>) => {
      return { ...state, ...action.payload };
    },
    clearProperty: () => initialState,
  },
});

export const { setProperty, clearProperty } = propertySlice.actions;
export default propertySlice.reducer;
