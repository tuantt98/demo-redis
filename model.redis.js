"use strict";

const client = require("./init.redis");

const get = async (key) => {
  return (await client).get(key);
};

const set = async (key, count) => {
  return (await client).set(key, count);
};

const incrby = async (key, count) => {
  return (await client).incrBy(key, count);
};

const decrby = async (key, count) => {
  return (await client).decrBy(key, count);
};

const exists = async (key) => {
  return (await client).exists(key);
};

const setnx = async (key, count) => {
  console.log("🚀 ~ file: model.redis.js:26 ~ setnx ~ key, count:", key, count);
  return (await client).setNX(key, count.toString());
};

module.exports = {
  get,
  set,
  incrby,
  exists,
  setnx,
  decrby,
};
