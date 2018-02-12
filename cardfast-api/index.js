var app = require('./config/custom-express')();

app.listen(3001, function(){
  console.log('Card server running on port 3001.');
});
