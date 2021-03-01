export default {
  type: 'PAY_BY_INSTALLMENT',
  description: "'Pay over time'",
  minimumAmount: {
    amount: '5.00',
    currency: 'EUR',
  },
  maximumAmount: {
    amount: '300.00',
    currency: 'EUR',
  },
  numberOfPayments: '3',
};
