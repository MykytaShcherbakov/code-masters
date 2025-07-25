import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("saleFormEmail") || "",
  name: localStorage.getItem("saleFormName") || "",
  phone: localStorage.getItem("saleFormPhone") || "",
  isSaleFormActive: localStorage.getItem("saleFormCoupon") === "true",
};

const saleFormSlice = createSlice({
  name: "saleForm",
  initialState,
  reducers: {
    applySaleForm: (state, action) => {
      const { email, name, phone } = action.payload;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.isSaleFormActive = true;

      localStorage.setItem("saleFormEmail", email);
      localStorage.setItem("saleFormName", name);
      localStorage.setItem("saleFormPhone", phone);
      localStorage.setItem("saleFormCoupon", "true");
    },
    resetSaleForm: (state) => {
      state.email = "";
      state.name = "";
      state.phone = "";
      state.isSaleFormActive = false;

      localStorage.removeItem("saleFormEmail");
      localStorage.removeItem("saleFormName");
      localStorage.removeItem("saleFormPhone");
      localStorage.removeItem("saleFormCoupon");
    },
  },
});

export const { applySaleForm, resetSaleForm } = saleFormSlice.actions;
export default saleFormSlice.reducer;
