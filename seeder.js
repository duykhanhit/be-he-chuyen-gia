const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const CauHinh = require("./models/CauHinh");
const Rule = require("./models/Rule");
const Laptop = require("./models/Laptop");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const cauhinh = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cauhinh.json`, "utf-8")
);

const luat = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/luat.json`, "utf-8")
);

const laptop = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/laptop.json`, "utf-8")
);

const importData = async () => {
  try {
    await CauHinh.create(cauhinh);
    await Rule.create(luat);
    await Laptop.create(laptop);

    console.log("Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

const deleteData = async () => {
  try {
    await CauHinh.deleteMany();
    await Rule.deleteMany();
    await Laptop.deleteMany();

    console.log("Deleted...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
// run "node seeder -i" to insert data
// run "node seeder -d" to delete data
