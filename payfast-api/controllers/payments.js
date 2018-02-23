
function getDAO(app) {
    var connection = app.persistence.connectionFactory();
    return new app.persistence.PaymentDAO(connection);
}

module.exports = function(app){
    //GET all payments
    app.get('/api/payments', function findAllPayments(req, res){
        console.log("Listing payments...");

        var paymentDAO = getDAO(app);

        paymentDAO.list(function postListing(error, result) {
            if (error) {
                console.error('Error during Payment listing', error);
            } else {
                res.send(result);
            }
        });
    });

    //Save a payment via POST
    app.post('/api/payments/payment', function createPayment(req, res){
        console.log('Processing Payment request...');

        /*VALIDATION*/
        //Validate payment on the request using express-validator
        req.assert("payment.payment_method", "Payment method is required").notEmpty();
        req.assert("payment.amount", "Amount has to be a valid float value").notEmpty().isFloat();
        var errors = req.validationErrors();

        if (errors) {
            console.error("Validation errors", errors);
            res.status(400).send(errors);
            return;
        }

        /*OBJECT CREATION*/
        var payment = req.body["payment"];

        payment.status = 'CREATED';
        payment.payment_date = new Date();

        /*PERSISTENCE*/
        var paymentDAO = getDAO(app);

        paymentDAO.save(payment, function postSaving(error, result) {
            /*ERROR HANDLING*/
            if (error) {
                console.error('Error during Payment saving', error);
                res.status(500).send(error);
            } else {
                console.log('Payment created');
                payment.id = result.insertId;

                /*CARD PROCESSING*/
                //Process card authorization
                if (payment.payment_method == "card") {
                    var card = req.body["card"];

                    var cardClient = new app.services.cardClient();
                    cardClient.authorize(card,
                        function authorizationCallback(errorAuth, reqAuth, resAuth, resultAuth) {
                            if (errorAuth) {
                                console.log(errorAuth);
                                res.status(400).send(errorAuth);
                                return;
                            }

                            console.log("Consuming cards service...");
                            console.log(resultAuth);

                            /*RESPONSE CREATION*/
                            //Return new locaton available after insertion into MySQL db
                            res.location('/api/payments/payment/'+payment.id);

                            //Create a response wrapper following HATEOAS format
                            var response = {
                                data: payment,
                                card: resultAuth,
                                links:[
                                    {
                                        href:'http://localhost:3000/api/payments/payment/'+payment.id,
                                        rel:'confirm',
                                        method:'PUT'
                                    },
                                    {
                                        href:'http://localhost:3000/api/payments/payment/'+payment.id,
                                        rel:'cancel',
                                        method:'DELETE'
                                    }
                                ]
                            }

                            res.status(201).json(response);
                            return;
                        }
                    );
                } else {
                    /*RESPONSE CREATION*/
                    //Return new locaton available after insertion into MySQL db
                    res.location('/api/payments/payment/'+payment.id);

                    //Create a response wrapper following HATEOAS format
                    var response = {
                        data: payment,
                        links:[
                            {
                                href:'http://localhost:3000/api/payments/payment/'+payment.id,
                                rel:'confirm',
                                method:'PUT'
                            },
                            {
                                href:'http://localhost:3000/api/payments/payment/'+payment.id,
                                rel:'cancel',
                                method:'DELETE'
                            }
                        ]
                    }

                    res.status(201).json(response);
                }
            }
        });
    });

    app.put('/api/payments/payment/:id', function confirmPayment(req, res){
        console.log("Confirming payment...");

        var id = req.params.id;
        var payment = {id:id, status:'CONFIRMED'};

        var paymentDAO = getDAO(app);

        paymentDAO.update(payment, function postUpdate(error){
            if (error) {
                console.error('Error during Payment confirmation', error);
                res.status(500).send(error);
            } else {
                console.log('Payment confirmed');
                res.status(200).json(payment);
            }
        });
    });

    app.get("/api/payments/payment/:id", function postFind(req, res){
        var id = req.params.id;
        console.log("Searching payment "+ id);

        var paymentDAO = getDAO(app);

        paymentDAO.findById(id, function postFindById(error, result) {
            if (error) {
                console.error('Error searching Payment with id: ' + id, error);
                res.status(500).send(error);
                return;
            } else {
                console.log("Payment found: " + JSON.stringify(result));
                res.json(result);
            }
        });
    });

    app.delete('/api/payments/payment/:id', function cancelPayment(req, res){
        console.log("Canceling payment...");

        var id = req.params.id;
        var payment = {id:id, status:'CANCELED'};

        var paymentDAO = getDAO(app);

        paymentDAO.update(payment, function postCancelation(error){
            if (error) {
                console.error('Error during Payment cancelation', error);
                res.status(500).send(error);
            } else {
                console.log('Payment canceled');
                res.status(204).json(payment);
            }
        });
    });
}
