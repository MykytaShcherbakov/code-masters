import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
// Начальное состояние формы
=======
>>>>>>> development
const initialState = {
  email: localStorage.getItem("saleFormEmail") || "",
  name: localStorage.getItem("saleFormName") || "",
  phone: localStorage.getItem("saleFormPhone") || "",
<<<<<<< HEAD
=======
  // Форма активна только если купон есть и первый заказ не завершён
>>>>>>> development
  isSaleFormActive:
    localStorage.getItem("saleFormCoupon") === "true" &&
    localStorage.getItem("hasFirstOrderCompleted") !== "true",
};

<<<<<<< HEAD
// Создание слайса saleForm
=======
>>>>>>> development
const saleFormSlice = createSlice({
  name: "saleForm",
  initialState,
  reducers: {
<<<<<<< HEAD
    // Действие при отправке формы
    applySaleForm: (state, action) => {
      const { email, name, phone } = action.payload;

      // Если первый заказ уже был завершён — больше не активировать купон
=======
    applySaleForm: (state, action) => {
      const { email, name, phone } = action.payload;
      // Не активируем скидку, если первый заказ уже был завершён
>>>>>>> development
      if (localStorage.getItem("hasFirstOrderCompleted") === "true") {
        state.isSaleFormActive = false;
        return;
      }
<<<<<<< HEAD
      // Сохраняем данные в состояние и localStorage
=======
>>>>>>> development
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.isSaleFormActive = true;

      localStorage.setItem("saleFormEmail", email);
      localStorage.setItem("saleFormName", name);
      localStorage.setItem("saleFormPhone", phone);
      localStorage.setItem("saleFormCoupon", "true");
    },
<<<<<<< HEAD
     // Сброс данных формы
=======
>>>>>>> development
    resetSaleForm: (state) => {
      state.email = "";
      state.name = "";
      state.phone = "";
      state.isSaleFormActive = false;

      localStorage.removeItem("saleFormEmail");
      localStorage.removeItem("saleFormName");
      localStorage.removeItem("saleFormPhone");
      localStorage.removeItem("saleFormCoupon");
<<<<<<< HEAD
    },
    // Установка завершения первого заказа
=======
      // Не удаляем hasFirstOrderCompleted — форма не появится снова
    },
    // Новый reducer для установки флага первого заказа
>>>>>>> development
    setFirstOrderCompleted: (state) => {
      localStorage.setItem("hasFirstOrderCompleted", "true");
      state.isSaleFormActive = false;
    },
  },
});

<<<<<<< HEAD
export const { applySaleForm, resetSaleForm, setFirstOrderCompleted } =
  saleFormSlice.actions;
export default saleFormSlice.reducer;
=======
export const { applySaleForm, resetSaleForm, setFirstOrderCompleted } = saleFormSlice.actions;
export default saleFormSlice.reducer;
>>>>>>> development
