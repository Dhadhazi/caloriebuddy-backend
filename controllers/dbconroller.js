const mongoose = require("mongoose");

exports.connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open");
  });
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });
};
exports.disconnect = () => {
  // mongoose.connection.close();
};

exports.write = async (data, res) => {
  this.connect();
  try {
    await data.save();
    this.disconnect();
    res.send(data);
  } catch (err) {
    console.log(err);
    this.disconnect();
    res.status(500).send(err);
  }
};
