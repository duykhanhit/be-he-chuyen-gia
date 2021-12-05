const asyncHandle = require("../middlewares/asyncHandle");
const Rule = require("../models/Rule");
const Laptop = require("../models/Laptop");

const tinhHoanVi = (input) => {
  const permArr = [],
    usedChars = [];
  const permute = (input) => {
    let i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        permArr.push(usedChars.slice());
      }
      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  };
  return permute(input);
};

module.exports = {
  advise: asyncHandle(async (req, res, next) => {
    const { gt } = req.body;

    const rootArray = gt.split(" ^ ");
    const cloneRootArray = gt.split(" ^ ");
    let rootHoanvi = [];

    let rules = [];
    let length = 0;
    do {
      length = rules.length;
      let hoanvi = tinhHoanVi(cloneRootArray);
      hoanvi = hoanvi.map((e) => e.join("^"));

      for (let i = 0; i < cloneRootArray.length; i++) {
        rootHoanvi = [...tinhHoanVi([cloneRootArray[i]]).flat(), ...rootHoanvi];
      }

      while (cloneRootArray.length > 2) {
        cloneRootArray.shift();
        const cloneArray = tinhHoanVi(cloneRootArray).map((e) => e.join("^"));
        rootHoanvi = [...cloneArray, ...rootHoanvi];
      }

      rootHoanvi = [...rootHoanvi, ...hoanvi].filter((e) => e.length > 0);

      rules = await Rule.find({
        vetrai: { $in: rootHoanvi.flat() },
      });

      rules.forEach((e) => {
        if (!rootArray.includes(e.vephai)) {
          rootArray.push(e.vephai);
        }
      });
    } while (rules.length !== length);

    const ruleLaptop = rules.find((e) => e.vephai.indexOf("LT"));
    let laptop;
    if (ruleLaptop) {
      laptop = await Laptop.find({
        key: ruleLaptop.vephai,
      });
    }

    return res.json({
      success: true,
      data: rules,
      laptop,
    });
  }),
};
