const services = require('../services');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const payment = async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        metadata: {
          student_id: req.body.student.student_id
        }
      })
  
      const line_items = req.body.applications.map(application => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              id: application.application_id.url,
              name: application.application_project.project_name,
              images: [application.application_project.image.url],
              metadata: {
                id: application.application_project.project_id.url
              }
            },
            unit_amount: application.application_project.price * 100
          },
          quantity: 1
        }
      });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.STRPIE_URL}/success.html`,
      cancel_url: `${process.env.STRPIE_URL}/cancel.html`,
    });
  
      //   // customer: customer.id,
      //   mode: 'payment',
      //   success_url: `${process.env.STRPIE_URL}/success.html`,
      //   cancel_url: `${process.env.STRPIE_URL}/cancel.html`,
      // });
    
      res.send({url: session.url});
    } catch (error) {
      console.log(error);
    }
    // res.json({url: "Hi"});
  };
  

  // Create Order 
  const createOrder = async(customer, data, lineItems) => {
    const newOrder = new Order ({
      userId: customer.metadata.userId, 
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: lineItems.data,
      // subtotal: data.amount_subtotal,
      total: data.amount_total,
      payment_status: data.payment_status,
    });

    try {
     const saveOrder =  await newOrder.save();

     console.log("Process: ", saveOrder);
    } catch (error) {
      console.log(error);
    }

  }

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret ;

// endpointSecret = "whsec_529ea47186297862931c44246e83735da71f396f4dfc9907b46249ba95699c3d";

const stripeWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data; 
  let eventType;

  if (endpointSecret) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook verified");
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;
  }
  else {
    data = req.body.data.object;
    console.log('data1', data);
    eventType = req.body.type; 
    console.log('eventType', eventType);
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    console.log('customer', data.customer);
    console.log('data', data);
    const cus = stripe.customer.retrieve('cus_NVmH29vuHEwtd6')
    console.log('cus', cus);
    // .then((customer) => {
    //   console.log("data:", data);
      // stripe.checkout.sessions.listLineItems(
      //   data.id,
      //   {},
      //   function(err, lineItems) {
      //     console.log("Line_items", lineItems);
      //     console.log(customer);
      //     console.log("data:", data);

      //     createOrder(customer, data, lineItems)
      //   }
      // );
      // data.customer = ''; 
      console.log(customer);
          console.log("data:", data);

          createOrder(customer, data, lineItems)
      
    // }).catch(err => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end;
};

module.exports = {payment, stripeWebhook};