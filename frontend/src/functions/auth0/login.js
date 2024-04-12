export function login(email, password, callback) {
  const bcrypt = require("bcrypt");
  const MongoClient = require("mongodb@5.1.0").MongoClient;
  const client = new MongoClient(
    'mongodb+srv://pasterkaadrian:uCgtPdtkelF8mz40@cluster-0.vsqoqx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-0"'
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("Node-API");
    const users = db.collection("users");

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid)
          return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
          user_id: user._id.toString(),
          nickname: user.nickname,
          email: user.email,
        });
      });
    });
  });
}
