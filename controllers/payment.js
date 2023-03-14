require("dotenv").config();

const services = require('../services');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const db = require("../models");

const payment = async (req, res) => {
    try {
      const {student_id} = req.user;
      console.log(student_id);
      const application = await db.Application.findOne({
        where: { 
            application_id: req.body.deliverables[0].deliverable_application.application_id
        },
        include: [
          {
            model: db.Student,
            as: "application_student",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }
      ]
      });
    
      const project_owner = await db.Project.findOne({
        raw: true,
        nest:true,
        where: { 
            project_id: application.project_id
        },
        include: [
          {
            model: db.Student,
            as: "project_poster",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          }
      ]
      });

      // console.log();

      if(project_owner.project_poster.student_id !== student_id) {
        resolve({
          msg: 'You are not owner of this project to accept application',
        });
      } else {
        const customer = await stripe.customers.create({
          metadata: {
            poster_id: student_id,
            doer_id: req.body.deliverables[0].deliverable_application.student_id,
            deliverable_id: req.body.deliverables[0].deliverable_id,
            application_id: req.body.deliverables[0].deliverable_application.application_id
          }
        })
    
        const line_items = req.body.deliverables.map(deliverable => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: deliverable.title,
              },
              unit_amount: deliverable.deliverable_application.price * 100
            },
            quantity: 1
          }
        });
  
      const session = await stripe.checkout.sessions.create({
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      });
      res.send({url: session.url});
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const createHistory = async (customer, data, lineItems) => {
  const newTransaction = await db.Transaction.create({
    poster_id: customer.metadata.poster_id,
    doer_id: customer.metadata.doer_id,
    deliverable_id: customer.metadata.deliverable_id,
    price: data.amount_total,
    status: data.payment_status
  });

  console.log("Process: ", newTransaction.toJSON());
};

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret ;

endpointSecret = process.env.STRIPE_SECRET_KEY;

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data; 
  let eventType;

  if (endpointSecret) {
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
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
  console.log(eventType);
  // Handle the event
  if (eventType === "checkout.session.completed") {
    // console.log('customer', data.customer);
    const cus = await stripe.customers.retrieve(
      data.customer
    ).then((customer) => {
      console.log("data:", data);
      stripe.checkout.sessions.listLineItems(
        data.id,
        {},
        function(err, lineItems) {
          console.log("Line_items", lineItems);
          console.log('cus234', customer);
          console.log("data:", data);

          createHistory(customer, data, lineItems)
        }
      );
    }).catch(err => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end;
};

module.exports = {payment, stripeWebhook};