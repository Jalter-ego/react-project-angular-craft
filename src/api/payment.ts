import { api } from ".";

interface responseStripe{
    sessionId: string
    url: string
}

export interface propsStripePayment{
    amount: number; 
    currency: string; 
    nombre_servicio: string 
}

export const fetchPaymentStripe = async (props: propsStripePayment) => {
  try {
    const response = await fetch(api + "/payload/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( props ),
    });

    const data: responseStripe = await response.json()
    return data
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateCredits = async (email:string, amount:number) => {
  try {
    const response = await fetch(api + "/payload/credits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {email,amount} ),
    });

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error);
  }
};


