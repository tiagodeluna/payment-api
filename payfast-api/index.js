var app = require('./config/custom-express')();

app.listen(3000, function(){
    console.log("REST API is running on port 3000 =)");
});
