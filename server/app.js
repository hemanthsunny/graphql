const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000;
const schema = require("./schema/index");

mongoose.connect("mongodb://hemanth:test123@ds031193.mlab.com:31193/first_app", {useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log("Connected to Database..!")
})
// allow cross-origin platform requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log("Listening to " + port);
})
