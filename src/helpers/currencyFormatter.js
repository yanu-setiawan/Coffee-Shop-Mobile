/* eslint-disable prettier/prettier */
export const currencyFormatter = price => {
  return parseFloat(price)
    .toFixed()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
