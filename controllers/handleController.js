const asyncHandle = require("../middlewares/asyncHandle");
const Rule = require("../models/Rule");
const Laptop = require("../models/Laptop");
const axios = require("axios").default;

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

    const ruleLaptop = rules
      .filter((e) => e.vephai.includes("LT"))
      .map((e) => e.vephai);

    let laptop;
    if (ruleLaptop) {
      laptop = await Laptop.find({
        key: {
          $in: ruleLaptop,
        },
      });
    }

    return res.json({
      success: true,
      data: rules,
      laptop: laptop || [],
    });
  }),
  removeRedundantRule: asyncHandle(async (req, res, next) => {
    const rules = await Rule.find({});
    const redundantRules = [];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const response = await axios.post(
        `http://localhost:5000/api/tu-van/`,
        { gt: rule.vetrai.split("^").join(" ^ ") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let TG = "";
      let { data } = response.data;
      data = data.filter((e) => {
        const ruleExistsRedundant = redundantRules.find((v) => v.key == e.key);
        if (ruleExistsRedundant) return false;
        return true;
      });

      for (let j = 0; j <= data.length; j++) {
        if (
          j <= data.length &&
          j > 0 &&
          data[j - 1]._id != rule._id &&
          TG.split(",").indexOf(data[j - 1].vephai) === -1
        ) {
          TG = `${TG}${data[j - 1].vephai},`.replace(" ^ ", ",");
        }
      }

      if (TG.split(",").indexOf(rule.vephai) !== -1) {
        redundantRules.push(rule);
      }
    }

    return res.json({
      success: true,
      data: redundantRules,
    });
  }),
};
