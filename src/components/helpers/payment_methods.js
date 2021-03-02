import * as Constants from './Constants';
import {  APPLE_MERCHANT_ID_LIVE,APPLE_MERCHANT_ID_TEST } from './../../config/configs';
export function payWithApplePay(netTotalPrice,countryName,callBack){
   
    var countryCode = '';
    var currencyCode = '';
   
    if(countryName == Constants.INDIA)
    {
        countryCode = 'IN';
        currencyCode = 'INR';
    }
    else
    {
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
                        callBack('SUCCESS',paymentResponse);
                      
                    })
                    .catch((error)=>{
                        //navigation.navigate(Constants.PaymentFailedScreen);
                        console.log("STEP 3 ",error)
                        callBack('FAILED',error.message);
                    });
            }
            else {
                console.log("STEP 2 ",error)
                callBack('FAILED','CANT_MAKE_PAYMENT');
              }
        })
        .catch((error) => {
            console.log("STEP 1 ",error)
            callBack('FAILED',error.message);
        })

}