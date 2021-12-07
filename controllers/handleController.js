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

    let rules = [];
    let length = 0;

    do {
      length = rules.length;
      rules = await Rule.aggregate([
        {
          $addFields: {
            temp: { $split: ["$vetrai", "^"] },
          },
        },
        {
          $match: {
            temp: {
              $in: rootArray,
            },
          },
        },
      ]);

      rules = rules.filter((e) => {
        let check = true;
        const vetrai = e.vetrai.split("^");
        for (let i = 0; i < vetrai.length; i++) {
          if (!rootArray.includes(vetrai[i])) {
            check = false;
            break;
          }
        }
        delete e.temp;
        return check;
      });

      rules.forEach((e) => {
        if (!rootArray.includes(e.vephai)) {
          rootArray.push(e.vephai);
        }
      });
    } while (length !== rules.length);

    const ruleLaptop = rules.find((e) => e.vephai.includes("LT"));

    let laptop;
    if (ruleLaptop) {
      laptop = await Laptop.find({
        key: ruleLaptop.vephai,
      });
    }

    return res.json({
      success: true,
      data: rules,
      laptop: laptop || [],
    });
  }),
};
