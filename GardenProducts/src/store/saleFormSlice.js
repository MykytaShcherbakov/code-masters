import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("saleFormEmail") || "",
  name: localStorage.getItem("saleFormName") || "",
  phone: localStorage.getItem("saleFormPhone") || "",
  // Форма активна только если купон есть и первый заказ не завершён
  isSaleFormActive:
    localStorage.getItem("saleFormCoupon") === "true" &&
    localStorage.getItem("hasFirstOrderCompleted") !== "true",
};

const saleFormSlice = createSlice({
  name: "saleForm",
  initialState,
  reducers: {
    applySaleForm: (state, action) => {
      const { email, name, phone } = action.payload;
      // Не активируем скидку, если первый заказ уже был завершён
      if (localStorage.getItem("hasFirstOrderCompleted") === "true") {
        state.isSaleFormActive = false;
        return;
      }
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
      // Не удаляем hasFirstOrderCompleted — форма не появится снова
    },
    // Новый reducer для установки флага первого заказа
    setFirstOrderCompleted: (state) => {
      localStorage.setItem("hasFirstOrderCompleted", "true");
      state.isSaleFormActive = false;
    },
  },
});

export const { applySaleForm, resetSaleForm, setFirstOrderCompleted } = saleFormSlice.actions;
export default saleFormSlice.reducer;