import * as Constants from './Constants';
import { APPLE_MERCHANT_ID_LIVE, APPLE_MERCHANT_ID_TEST, RAZOR_PAY_TEST_KEY } from './../../config/configs';
import RNRazorpayCheckout from 'react-native-razorpay';
import { COLOR, CommonStyles } from '../../config/styles';

export function payWithApplePay(netTotalPrice, countryName, callBack) {

    var countryCode = '';
    var currencyCode = '';

    if (countryName == Constants.INDIA) {
        countryCode = 'IN';
        currencyCode = 'INR';
    }
    else {
        countryCode = 'US';
        currencyCode = 'USD';
    }

    const PaymentRequest = require('react-native-payments').PaymentRequest;

    const DETAILS = {
        id: 'basic-example',


        total: {
            label: 'beGalileo',
            amount: { currency: currencyCode, value: netTotalPrice }
        }
    };

    const METHOD_DATA = [{
        supportedMethods: ['apple-pay'],
        data: {
            merchantIdentifier: APPLE_MERCHANT_ID_LIVE,
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            countryCode: countryCode,
            currencyCode: currencyCode
        }
    }];

    // const OPTIONS = {
    //     requestPayerName: false,
    //     requestPayerPhone: false,
    //     requestPayerEmail: false,
    //     requestShipping: false


    // };

    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest.canMakePayments().then((canMakePayment) => {
        if (canMakePayment) {
            //   Alert.alert(
            //     'Apple Pay',
            //     'Apple Pay is available in this device'
            //   );

            paymentRequest.show()
                .then(paymentResponse => {
                    // Your payment processing code goes here
                    console.log(paymentResponse);
                    paymentResponse.complete('success');
                    callBack('SUCCESS', paymentResponse);

                })
                .catch((error) => {
                    //navigation.navigate(Constants.PaymentFailedScreen);
                    console.log("STEP 3 ", error)
                    callBack('FAILED', error.message);
                });
        }
        else {
            console.log("STEP 2 ", error)
            callBack('FAILED', 'CANT_MAKE_PAYMENT');
        }
    })
        .catch((error) => {
            console.log("STEP 1 ", error)
            callBack('FAILED', error.message);
        })

}

export function payWithRazorPay(order_response, netTotalPrice, countryName ,localParentEmail, localParentContactNumber, localParentName, navigation, callBackPaymentStatus) {
    console.log(countryName);

    var countryCode = '';
    var currencyCode = '';

    if (countryName == Constants.INDIA) {
        countryCode = 'IN';
        currencyCode = 'INR';
    }
    else {
        countryCode = 'US';
        currencyCode = 'USD';
    }


    var formattdTotalPrice = netTotalPrice + "00";

    var options = {
        description: 'beGalileo Package',
        image: 'https://www.begalileo.com/assets/pwa/beGalileo_logo_1024x768.png',
        currency: 'INR',
        key: RAZOR_PAY_TEST_KEY,
        amount: formattdTotalPrice,
        name: 'Carveniche Technologies',
        order_id: order_response.razorpay_order_id,
        prefill: {
            email: localParentEmail,
            contact: localParentContactNumber,
            name: localParentName
        },
        notes: {
            user_id: order_response.user_id,
            user_subscription_ids: JSON.stringify(order_response.user_subscription_ids),
            coupon_code: order_response.coupon_code
        },
        theme: { color: COLOR.TEXT_COLOR_GREEN }
    }
    console.log(options);

    RNRazorpayCheckout.open(options).then((data) => {
        // handle success
        // this.props.navigation.navigate(Constants.PaymentSuccessScreen);
        callBackPaymentStatus(data.razorpay_payment_id);
        // alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
        // handle failure
        console.log("Payment failed Error ");
        console.log(error);
        // this.updatePaymentStatus(data.razorpay_payment_id);
        navigation.navigate(Constants.PaymentFailedScreen);
    });
}