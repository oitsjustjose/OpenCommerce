const user = require("./dist/app/models/User").default;
const mongoose = require('mongoose');

const init = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_URI}/${process.env.MONGO_COLLECTION}`,
    { autoIndex: true }
  );

  await user.updateOne({ email: 'stovallj1995@gmail.com' }, { $set: { admin: true } });

  // const u = new user();
  // u.email = "stovallj1995@gmail.com";
  // u.password = u.hashPassword("hotdog123");
  // u.isEmailValidated = true;
  // await u.save();
};

init().then(process.exit);