export function getByEmail(email, callback) {
  const MongoClient = require("mongodb@5.1.0").MongoClient;
  const client = new MongoClient(
    'mongodb+srv://pasterkaadrian:uCgtPdtkelF8mz40@cluster-0.vsqoqx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-0"'
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("Node-API");
    const users = db.collection("users");

    users.findOne({ email: email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email,
      });
    });
  });
}
