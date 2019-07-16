import Bmob from "hydrogen-js-sdk";
Bmob.initialize(
  "8627d3b39665d23fbf65d8df3d396455",
  "fa046d5196f2d27170620808e239b5b5"
);
const user = Bmob.Query("_User");
const member = Bmob.Query("member");
const goods = Bmob.Query("goods");
const exchange = Bmob.Query("exchange");

// 获取员工
export let getUser = objectId => {
  user.get(objectId).then(res => {
    console.log(res);
  });
};
// 获取会员
export let getMember = async () => {
  return await member.find();
};
// 获取一个会员
export let getMemberOne = async objectId => {
  return await member.get(objectId);
};
// 新增会员
export let addMember = (name, integral, phoneNumber, email) => {
  member.set("mName", name);
  member.set("mIntegral", integral);
  member.set("mPhoneNumber", phoneNumber);
  member.set("mEmail", email);
  member.save();
};
// 删除会员
export let delMember = objectId => {
  member
    .destroy(objectId)
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
// 修改会员
export let updateMember = async (
  objectId,
  name,
  integral,
  phoneNumber,
  email
) => {
  member.set("id", objectId); //需要修改的objectId
  member.set("mName", name);
  member.set("mIntegral", integral);
  member.set("mPhoneNumber", phoneNumber);
  member.set("mEmail", email);
  await member.save();
};
// 修改会员积分
export let updateMemberIntegral = async (objectId, integral) => {
  member.set("id", objectId); //需要修改的objectId
  member.set("mIntegral", integral);
  await member.save();
};
// 获取商品
export let getGoods = () => {
  return goods.find();
};
// 添加商品
export let addGoods = (gTitle, gIntegral, gDetail, gImg) => {
  goods.set("gTitle", gTitle);
  goods.set("gIntegral", gIntegral);
  goods.set("gDetail", gDetail);
  goods.set("gImg", gImg);
  goods.save();
};
//删除商品
export let delGoods = objectId => {
  goods.destroy(objectId);
};
// 获取一行商品信息
export let getGoodsOne = objectId => {
  return goods.get(objectId);
};
// 修改商品
export let updateGoods = (objectId, gTitle, gIntegral, gDetail, gImg) => {
  goods.set("id", objectId); //需要修改的objectId
  goods.set("gTitle", gTitle);
  goods.set("gIntegral", gIntegral);
  goods.set("gDetail", gDetail);
  goods.set("gImg", gImg);
  goods.save();
};
// 获取商品兑换记录
export let getExchange = () => {
  return exchange.find();
};
// 获取一个商品兑换记录
export let getExchangeOne = async () => {
  return await exchange.get("a1b2e8c945");
};
// 存储兑换商品记录
export let setExchange = async (emobjectId, array) => {
  exchange.set("emObjectId", emobjectId);
  exchange.set("egData", array);
  await exchange.save();
};
// 更新兑换商品记录
export let updateExchange = (objectId, array) => {
  exchange.set("id", objectId); //需要修改的objectId
  exchange.set("egData", array);
  exchange.save();
};
