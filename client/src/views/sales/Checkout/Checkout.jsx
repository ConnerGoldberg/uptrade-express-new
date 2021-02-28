import React, { useEffect, useCallback, useState } from 'react';
import {
  Alert,
  Col,
  Card,
  CardBody,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from 'reactstrap';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import history from '../../../lib/history';
import api from '../../../lib/api';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import banner from '../../../assets/banner.jpg';
import forum from '../../../assets/forum.png';
import family from '../../../assets/family.png';
import tools from '../../../assets/tools.png';
import './Checkout.css';

const Checkout = ({ location }) => {
  const user = useSelector((state) => state.auth?.user);
  const [productId, setProductId] = useState(0);
  const [amount, setAmount] = useState(20);
  const [product, setProduct] = useState();
  const [configuration, setConfiguration] = useState();
  const [display, setDisplay] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [checkout, setCheckout] = useState(!isOpen);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('subscription');
  const [gtin, setGtin] = useState(`123456789${productId}`);
  const [sku, setSku] = useState(`12341234${productId}`);
  const [brand, setBrand] = useState('uptrade');
  const [paymentProviderId, setPaymentProviderId] = useState(1);
  //Scalapay Order Form
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postCode, setPostCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [billingSameAsShippingAddress, setBillingSameAsShippingAddress] = useState(true);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingSuburb, setShippingSuburb] = useState('');
  const [shippingPostCode, setShippingPostCode] = useState('');
  const [shippingCountryCode, setShippingCountryCode] = useState('');

  const [redirectConfirmUrl, setRedirectConfirmUrl] = useState('https://staging.portal.scalapay.com/success-url');
  const [redirectCancelUrl, setRedirectCancelUrl] = useState('https://staging.portal.scalapay.com/failure-url');
  const [merchantReference, setMerchantReference] = useState(
    `${(moment().utc().toDate().getTime() / 1000).toString().split('.')[0]}-${user.id}-${productId}`,
  );

  const [errored, setErrored] = useState(false);
  const [countryCodeErrored, setCountryCodeErrored] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('id');
    if (productId > 0) {
      api.getScalapayConfiguration().then((res) => {
        const scalaPayConfig = res && res.data;
        setConfiguration(scalaPayConfig);
      });
      api.getProductById(productId).then((res) => {
        const product = res && res.data;
        setProduct(product);
        if (product) {
          setProductId(product.id);
          setAmount(product.price?.unit_amount);
          setIsOpen(true);
          setGtin(`123456789${productId}`);
          setSku(`12341234${productId}`);
          setMerchantReference(
            `${(moment().utc().toDate().getTime() / 1000).toString().split('.')[0]}-${user.id}-${productId}`,
          );
        } else {
          setProductId(undefined);
        }
      });
    }
  }, [location.search]);

  useEffect(() => {
    if (billingSameAsShippingAddress) {
      setAddress(shippingAddress);
      setSuburb(shippingSuburb);
      setPostCode(shippingPostCode);
      setCountryCode(shippingCountryCode);
    }
  }, [billingSameAsShippingAddress]);

  const validatePurchaseOrder = (purchaseOrder) => {
    if (product?.price?.currency?.toLowerCase() !== 'eur') {
      return false;
    }
    if (countryCode.length > 2) {
      setCountryCodeErrored(true);
      return false;
    }

    return (
      purchaseOrder.totalAmount.amount > 0 &&
      purchaseOrder.consumer.surname.length &&
      purchaseOrder.consumer.givenNames.length > 2 &&
      purchaseOrder.consumer.phoneNumber.length &&
      purchaseOrder.merchant &&
      purchaseOrder.shipping.line1.length &&
      purchaseOrder.shipping.postcode.length &&
      purchaseOrder.shipping.suburb.length &&
      purchaseOrder.shipping.countryCode.length &&
      purchaseOrder.merchantReference &&
      purchaseOrder.items.length
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let purchaseOrder = {};

    purchaseOrder.totalAmount = { amount: amount, currency: product.price?.currency };
    purchaseOrder.consumer = {
      phoneNumber: phoneNumber,
      givenNames: `${firstName} ${middleName}`,
      surname: surname,
      email: user.email,
    };
    purchaseOrder.billing = {
      name: `${firstName} ${middleName} ${surname}`,
      line1: address,
      suburb: suburb,
      postcode: postCode,
      countryCode: countryCode,
      phoneNumber: phoneNumber,
    };
    purchaseOrder.shipping = {
      name: `${firstName} ${middleName} ${surname}`,
      line1: shippingAddress,
      suburb: shippingSuburb,
      postcode: shippingPostCode,
      countryCode: shippingCountryCode,
      phoneNumber: phoneNumber,
    };
    purchaseOrder.items = [
      {
        name: product.name,
        category: category,
        subcategory: [],
        brand: brand,
        gtin: gtin,
        sku: sku,
        quantity: quantity,
        price: { amount: amount, currency: product.price?.currency },
        product_id: productId,
      },
    ];
    purchaseOrder.merchant = { redirectConfirmUrl: redirectConfirmUrl, redirectCancelUrl: redirectCancelUrl };
    purchaseOrder.merchantReference = merchantReference;
    purchaseOrder.taxAmount = { amount: amount ? (amount / 10).toFixed(2) : 0, currency: product.price?.currency };
    purchaseOrder.user_id = user.id;
    purchaseOrder.payment_provider_id = paymentProviderId;

    const isValid = validatePurchaseOrder(purchaseOrder);
    setErrored(!isValid);

    if (isValid) {
      api
        .orderWithScalapay(purchaseOrder)
        .then((res) => {
          if (res && res.data && res.data?.checkoutUrl) {
            window.open(res.data.checkoutUrl, '_blank', 'noopener=yes,noreferrer=yes');
            Swal.fire('Success', `Finalize your payment on scalapay: ${res.data.checkoutUrl}`, 'success');
            setCheckout(false);
          } else {
            Swal.fire('Error', `Something went wrong when creating your order`, 'error');
          }
        })
        .catch((err) => {
          Swal.fire('Error', `Something went wrong when creating your order`, 'error');
        });
    }
  };

  return (
    <React.Fragment>
      <Header module="authenticated" />
      <Row>
        <img style={{ width: '100%', overflow: 'hidden' }} src={banner} alt="banner" />
        <div className="container">
          <h1>Checkout</h1>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=1">
                  <img src={forum} />
                  <h3>Community</h3>
                </a>
                <p>€20/month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=1');
                    setIsOpen(true);
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=2">
                  <img src={family} />
                  <h3>Family</h3>
                </a>
                <p>€50/month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=2');
                    setIsOpen(true);
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="box">
            <Card>
              <CardBody>
                <a href="/checkout?id=3">
                  <img src={tools} />
                  <h3>Premium Enterprise</h3>
                </a>
                <p>€100/month per user</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo delectus possimus ducimus
                  autem. Sapiente facilis animi, quas laboriosam officia officiis. Esse temporibus sequi iste inventore
                  aut voluptate aspernatur accusamus!
                </p>
                <Button
                  color="info"
                  onClick={() => {
                    history.push('/checkout?id=3');
                    setIsOpen(true);
                  }}
                >
                  Checkout
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Row>

      {configuration && product && (
        <React.Fragment>
          <Modal
            isOpen={isOpen}
            toggle={() => {
              setIsOpen(!isOpen);
            }}
          >
            <ModalHeader>Confirm Your Order</ModalHeader>
            <ModalBody>
              <Row>
                <div className="container">
                  <h5>You have selected to purchase our {product.name} package</h5>
                  <hr />
                  <p>The total cost for this month is €{product.price.unit_amount}</p>
                  <scalapay-widget
                    amount={amount}
                    min={configuration.minimumAmount.amount}
                    max={configuration.maximumAmount.amount}
                    numberOfPayments={configuration.numberOfPayments}
                  ></scalapay-widget>
                  <br />
                  <Button
                    color="info"
                    onClick={() => {
                      setDisplay(!display);
                    }}
                  >
                    {!display ? 'Display Configuration' : 'Hide Configuration'}
                  </Button>
                  <Button
                    className="checkout-btn"
                    color="success"
                    onClick={() => {
                      setCheckout(true), setIsOpen(!isOpen);
                    }}
                  >
                    Checkout With Scalapay
                  </Button>
                  {display && (
                    <div>
                      <br /> <p>{JSON.stringify(configuration)}</p>
                    </div>
                  )}
                </div>
              </Row>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={checkout}
            toggle={() => {
              setCheckout(!checkout);
            }}
          >
            <ModalHeader>Confirm Your Order</ModalHeader>
            <ModalBody>
              <Row>
                <div className="container">
                  <h5>You have selected to purchase our {product.name} package</h5>
                  <hr />
                  <p>The total cost for this month is €{product.price.unit_amount}</p>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="ml-3">
                        <FormGroup>
                          <InputGroup>
                            <Label for="billingSameAsShippingAddress">
                              My shipping information is the same as my billing information.{' '}
                            </Label>
                            <Input
                              type="checkbox"
                              name="billingSameAsShippingAddress"
                              checked={billingSameAsShippingAddress}
                              onChange={() => {
                                setBillingSameAsShippingAddress(!billingSameAsShippingAddress);
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="fName">First Name *</Label>
                          <Input
                            type="text"
                            placeholder="First Name"
                            style={{ borderColor: errored && !firstName.length ? 'red' : 'none' }}
                            name="fName"
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="mName">Middle Name</Label>
                          <Input
                            type="text"
                            placeholder="Middle Name"
                            name="mName"
                            onChange={(e) => {
                              setMiddleName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12" lg="12">
                        <FormGroup>
                          <Label for="lName">Surname *</Label>
                          <Input
                            type="text"
                            style={{ borderColor: errored && !surname.length ? 'red' : 'none' }}
                            placeholder="Last Name"
                            name="lName"
                            onChange={(e) => {
                              setSurname(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="shipping-address">Address *</Label>
                          <Input
                            type="text"
                            placeholder="Address Line 1"
                            style={{ borderColor: errored && !shippingAddress.length ? 'red' : 'none' }}
                            name="shipping-address"
                            onChange={(e) => {
                              setShippingAddress(e.target.value);
                              setAddress(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="shipping-suburb">Suburb *</Label>
                          <Input
                            type="text"
                            placeholder="Suburb"
                            style={{ borderColor: errored && !shippingSuburb.length ? 'red' : 'none' }}
                            name="shipping-suburb"
                            onChange={(e) => {
                              setShippingSuburb(e.target.value);
                              setSuburb(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="shipping-postCode">Post Code *</Label>
                          <Input
                            type="text"
                            placeholder="Post Code"
                            style={{ borderColor: errored && !shippingPostCode.length ? 'red' : 'none' }}
                            name="shipping-postCode"
                            onChange={(e) => {
                              setShippingPostCode(e.target.value);
                              setPostCode(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="phoneNumber">Phone Number *</Label>
                          <Input
                            type="text"
                            style={{ borderColor: errored && !phoneNumber.length ? 'red' : 'none' }}
                            placeholder="Phone Number"
                            name="phoneNumber"
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="12" lg="6">
                        <FormGroup>
                          <Label for="shipping-countryCode">Country Code *</Label>
                          <Input
                            type="select"
                            name="shipping-countryCode"
                            id="shipping-countryCode"
                            style={{
                              borderColor:
                                countryCodeErrored || (errored && !shippingCountryCode.length) ? 'red' : 'none',
                            }}
                            onChange={(e) => {
                              setShippingCountryCode(e.target.value);
                              setCountryCode(e.target.value);
                            }}
                          >
                            <option>Country Code...</option>
                            <option>AU</option>
                            <option>US</option>
                            <option>GB</option>
                            <option>IT</option>
                            <option>FR</option>
                            <option>DE</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    {!billingSameAsShippingAddress && (
                      <>
                        <hr />
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label for="address">Address</Label>
                              <Input
                                type="text"
                                placeholder="Address Line 1"
                                name="address"
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" md="12" lg="6">
                            <FormGroup>
                              <Label for="suburb">Suburb</Label>
                              <Input
                                type="text"
                                placeholder="Suburb"
                                name="shipping-suburb"
                                onChange={(e) => {
                                  setSuburb(e.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="12" md="12" lg="6">
                            <FormGroup>
                              <Label for="shipping-postCode">Post Code</Label>
                              <Input
                                type="text"
                                placeholder="Post Code"
                                name="shipping-postCode"
                                onChange={(e) => {
                                  setPostCode(e.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" md="12" lg="12">
                            <FormGroup>
                              <Label for="countryCode">Country Code</Label>
                              <Input
                                type="select"
                                name="countryCode"
                                style={{ borderColor: countryCodeErrored ? 'red' : 'none' }}
                                id="countryCode"
                                onChange={(e) => {
                                  setCountryCode(e.target.value);
                                }}
                              >
                                <option>Country Code...</option>
                                <option>AU</option>
                                <option>US</option>
                                <option>GB</option>
                                <option>IT</option>
                                <option>FR</option>
                                <option>DE</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    )}
                    <Alert color="danger" isOpen={errored}>
                      Please fill out all required fields
                    </Alert>

                    <Row>
                      {' '}
                      <Col xs="6" md="6" lg="6">
                        {' '}
                        <Button color="success" type="submit">
                          {' '}
                          Pay Now
                        </Button>
                      </Col>{' '}
                      <Col xs="6" md="6" lg="6">
                        <Button
                          color="danger"
                          onClick={() => {
                            setCheckout(!checkout);
                          }}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  <br />
                </div>
              </Row>
            </ModalBody>
          </Modal>
        </React.Fragment>
      )}
      <div className="emptyDiv" />
      <Footer />
    </React.Fragment>
  );
};

export default Checkout;
