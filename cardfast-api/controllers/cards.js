module.exports = function(app) {
  app.post("/api/cards/authorize",function(req, res) {
    console.log('Processing payment with card...');

      var card = req.body;

      req.assert("number", "Number is required and must have 16 numeric characters").notEmpty().len(16,16);
      req.assert("flag", "Card flag is required.").notEmpty();
      req.assert("expiration_year", "Expiration year is required and must have 4 numeric characters").notEmpty().len(4,4);
      req.assert("expiration_month", "Expiration month is required and must have 2 numeric characters").notEmpty().len(2,2);
      req.assert("cvv", "CVV is required and must have 3 numeric characters").notEmpty().len(3,3);

      var errors = req.validationErrors();

      if (errors){
        console.log("Validation errors found");

        res.status(400).send(errors);
        return;
      }
      card.status = 'AUTHORIZED';

      var response = {
        card_data: card,
      }

      res.status(201).json(response);
      return;
  });
}
