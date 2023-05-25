/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  delivery: '',
  notes: '',
  shoppingCart: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (prevState, action) => {
      const {productId, sizeId} = action.payload;

      const existItemIndex = prevState.shoppingCart.findIndex(
        item => item.product_id === productId && item.size_id === sizeId,
      );

      if (existItemIndex !== -1) {
        // Jika item dengan productId dan sizeId yang sama sudah ada di dalam array,
        // tambahkan nilai qty pada item tersebut
        const updatedCart = prevState.shoppingCart.map((item, index) => {
          if (index === existItemIndex) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        });

        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }

      // Jika item tidak ditemukan, lakukan sesuai dengan kebutuhan Anda
      // Misalnya, tambahkan item baru ke shoppingCart dengan qty 1
      // atau tampilkan pesan kesalahan, dll.

      return prevState;
    },
    decrement: (prevState, action) => {
      const {productId, sizeId} = action.payload;

      const existItemIndex = prevState.shoppingCart.findIndex(
        item => item.product_id === productId && item.size_id === sizeId,
      );

      if (existItemIndex !== -1) {
        // Jika item dengan productId dan sizeId yang sama sudah ada di dalam array,
        // kurangi nilai qty pada item tersebut
        const updatedCart = prevState.shoppingCart.map((item, index) => {
          if (index === existItemIndex) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          }
          return item;
        });

        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }

      // Jika item tidak ditemukan, lakukan sesuai dengan kebutuhan Anda
      // Misalnya, tampilkan pesan kesalahan, dll.

      return prevState;
    },

    deliveryMethod: (prevState, action) => {
      return {...prevState, delivery: action.payload};
    },
    notes: (prevState, action) => {
      return {...prevState, notes: action.payload};
    },
    addtoCart: (prevState, action) => {
      console.log('adddd', action.payload);
      const exsistIdx = prevState.shoppingCart.findIndex(
        item =>
          item.product_id === action.payload.product_id &&
          item.size_id === action.payload.size_id,
      );

      if (exsistIdx !== -1) {
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty + action.payload.qty,
          subtotal: existItem.subtotal + action.payload.subtotal,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      } else {
        const updatedCart = [...prevState.shoppingCart, action.payload];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }
    },
    // addtoCart: (prevState, action) => {
    //   const {product_id, size_id, qty, price} = action.payload;

    //   const existItemIndex = prevState.shoppingCart.findIndex(
    //     item => item.product_id === product_id && item.size_id === size_id,
    //   );

    //   // Persentase penambahan subtotal berdasarkan size_id
    //   const sizePercentages = {
    //     2: 0.2, // 20%
    //     3: 0.5, // 30%
    //   };

    //   if (existItemIndex !== -1) {
    //     // Jika item dengan productId dan sizeId yang sama sudah ada di dalam array,
    //     // tambahkan nilai qty pada item tersebut
    //     const existItem = prevState.shoppingCart[existItemIndex];
    //     const updatedQty = existItem.qty + qty;
    //     const sizePercentage = sizePercentages[size_id]; // Ambil persentase penambahan berdasarkan size_id
    //     const updatedSubtotal =
    //       existItem.subtotal + price * qty * (1 + sizePercentage); // Penambahan persentase pada subtotal
    //     const updatedItem = {
    //       ...existItem,
    //       qty: updatedQty,
    //       subtotal: updatedSubtotal,
    //     };
    //     const updatedCart = [
    //       ...prevState.shoppingCart.slice(0, existItemIndex),
    //       updatedItem,
    //       ...prevState.shoppingCart.slice(existItemIndex + 1),
    //     ];
    //     return {
    //       ...prevState,
    //       shoppingCart: updatedCart,
    //     };
    //   } else {
    //     // Jika item belum ada di shoppingCart, tambahkan item baru dengan harga dan subtotal sesuai size yang dipilih
    //     const subtotal = price * qty * (1 + sizePercentages[size_id]); // Penambahan persentase pada subtotal
    //     const newItem = {
    //       product_id,
    //       size_id,
    //       qty,
    //       price,
    //       subtotal,
    //     };
    //     const updatedCart = [...prevState.shoppingCart, newItem];
    //     return {
    //       ...prevState,
    //       shoppingCart: updatedCart,
    //     };
    //   }
    // },

    resetCart: () => {
      return initialState;
    },
  },
});

export const counterAction = counterSlice.actions;
export default counterSlice.reducer;
