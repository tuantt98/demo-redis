const express = require("express");
const { get, set, setnx, incrby, exists } = require("./model.redis");
const app = express();

app.get("/order", async (req, res, next) => {
  const time = new Date().getTime();
  console.log(`Time request: ${time}`);

  const slTonKho = 10;
  const keyName = "ip16";

  const slMua = 1;

  const getKey = await exists(keyName);
  console.log("🚀 ~ file: redis.v1.js:15 ~ app.get ~ getKey:", getKey);

  if (!getKey) {
    await set(keyName, 0);
  }

  let slBanRa = await get(keyName);
  console.log("🚀 ~ file: redis.v1.js:21 ~ app.get ~ slBanRa:", slBanRa);

  if (+slBanRa + slMua > slTonKho) {
    console.log("===Het hang");
    return res.json({
      status: "success",
      msg: "Het hang",
      time,
    });
  }

  slBanRa = await incrby(keyName, slMua);
  console.log("🚀 ~ file: redis.v1.js:33 ~ app.get ~ slBanRa:", slBanRa);
  if (slBanRa > slTonKho) {
    await set("banquaroi", slBanRa - slTonKho);
  }
  return res.json({
    status: "success",
    msg: "ok",
    time,
  });
});

app.listen(3000, () => {
  console.log(`App running on port: 3000`);
});