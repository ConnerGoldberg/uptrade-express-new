export default {
  totalAmount: {
    amount: '50.00',
    currency: 'eur',
  },
  consumer: {
    phoneNumber: '0400000000',
    givenNames: 'Conner Test',
    surname: 'Goldberg',
    email: 'try@again.com',
  },
  billing: {
    name: 'Conner Test Goldberg',
    line1: '123 Test Street',
    suburb: 'Test',
    postcode: '1242',
    countryCode: 'AU',
    phoneNumber: '0400000000',
  },
  shipping: {
    name: 'Conner Test Goldberg',
    line1: '123 Test Street',
    suburb: 'Test',
    postcode: '1242',
    countryCode: 'AU',
    phoneNumber: '0400000000',
  },
  items: [
    {
      name: 'Family',
      category: 'subscription',
      subcategory: [],
      brand: 'uptrade',
      gtin: '1234567892',
      sku: '123412342',
      quantity: 1,
      price: {
        amount: '50.00',
        currency: 'eur',
      },
    },
  ],
  merchant: {
    redirectConfirmUrl: 'https://staging.portal.scalapay.com/success-url',
    redirectCancelUrl: 'https://staging.portal.scalapay.com/failure-url',
  },
  merchantReference: '1614520843-30-2',
  taxAmount: {
    amount: '5.00',
    currency: 'eur',
  },
};
