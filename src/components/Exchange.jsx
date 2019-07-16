import React, { Component } from "react";
import * as _ from "lodash";
import { Button, Input, Divider, InputNumber, message } from "antd";
import {
  getMemberOne,
  getGoods,
  updateMemberIntegral,
  setExchange,
  getExchange,
  updateExchange
} from "../api/index";
import "../css/Exchange.scss";
import GbImg from "../images/bgLogo.png";
export default class Exchange extends Component {
  state = {
    memberOne: {},
    memberId: "",
    goods: [],
    num: 1,
    isExist: null,
    loading: false
  };
  // 获取到当前会员
  async getMemberOne() {
    let memberOne = await getMemberOne(this.props.match.params.id);
    this.setState({
      memberOne,
      loading: false
    });
    if (memberOne) {
      message.success("兑换成功");
    }
  }
  // 获取商品兑换记录
  async getExchange() {
    let exchanges = await getExchange();
    //查看当前会员是否兑换过商品
    let excOne = exchanges.find(
      item => item.emObjectId === this.props.match.params.id
    );
    if (excOne) {
      this.setState({
        isExist: excOne,
        loading: false
      });
    }
    console.log(excOne);
  }
  // 获取所有商品
  async getGoodsInfo() {
    let goods = await getGoods();
    this.setState({
      goods: goods.reverse()
    });
  }
  componentWillMount() {
    this.setState({
      memberId: this.props.match.params.id
    });
    this.getMemberOne();

    this.getGoodsInfo();
    this.getExchange();
  }
  // 返回会员管理页
  goBack = () => {
    this.props.history.goBack();
  };
  // 搜索商品
  search = async value => {
    if (value === "") {
      message.error("请输入商品名称关键字");
      return false;
    }
    let arr = await getGoods();
    let obj = arr.filter(item => item.gTitle === value);
    if (obj * 1 !== [] * 1) {
      this.setState({
        goods: obj
      });
    } else {
      message.error("查找不到该商品");
    }
  };
  change = e => {
    if (e.target.value === "") {
      this.getGoodsInfo();
    }
  };
  // 点击兑换按钮
  excClick = async index => {
    this.setState({
      loading: true
    });
    console.log("点击");
    let { memberOne, goods, num, memberId, isExist } = this.state;
    let integral;
    let array = [];
    // 判断会员积分
    if (memberOne.mIntegral <= 0) {
      integral = 0;
    } else {
      integral = memberOne.mIntegral - goods[index].gIntegral * num;
    }
    // 判断会员是否兑换过，存在兑换记录数据表中
    if (isExist) {
      console.log("已存在");
      // 拿到当前会员已经兑换过的商品数据
      array = isExist.egData;
      // 获取当前点击的商品是否兑换过
      let isGoods = array.find(
        item => item.gObjectId === goods[index].objectId
      );
      console.log(isGoods);
      // 判断是否兑换过该商品
      if (isGoods) {
        num += isGoods.gNum;
        let idx = array.indexOf(isGoods);
        isGoods.gNum = num;
        isGoods.gTime = this.getLocalTime(new Date().getTime());
        array.splice(idx, 1, isGoods);
      } else {
        console.log("商品未兑换过");
        array.push({
          gObjectId: goods[index].objectId,
          gName: goods[index].gTitle,
          gNum: num,
          gTime: this.getLocalTime(new Date().getTime())
        });
      }
      // 更新当前会员的商品兑换记录
      updateExchange(isExist.objectId, array);
      this.setState({
        num: 1
      });
    } else {
      console.log("未存在");
      array.push({
        gObjectId: goods[index].objectId,
        gName: goods[index].gTitle,
        gNum: num,
        gTime: this.getLocalTime(new Date().getTime())
      });
      await setExchange(memberId, array);
      this.getExchange();
    }
    // 更新当前会员的积分
    await updateMemberIntegral(memberId, integral);
    // 重新获取当前会员数据
    this.getMemberOne();
  };
  // 时间戳转换为日期格式
  getLocalTime(nS) {
    return new Date(parseInt(nS))
      .toLocaleString()
      .replace(/年|月/g, "-")
      .replace(/日/g, " ");
  }
  render() {
    const { Search } = Input;
    const { memberOne, goods } = this.state;
    return (
      <div className="exchange p20">
        <div className="header">
          <section className="memberInfo">
            <p>
              <small>会员：</small>
              <span>{memberOne.mName}</span>
            </p>
            <p>
              <small>积分：</small>
              <span>{memberOne.mIntegral}</span>
            </p>
            <p>
              <small>号码：</small>
              <span>{memberOne.mPhoneNumber}</span>
            </p>
            <Button onClick={this.goBack}>返回</Button>
          </section>
          <section className="bgImg">
            <img src={GbImg} alt="" />
          </section>
        </div>
        <Divider>商品兑换</Divider>
        <div className="exc_content">
          <div className="search">
            <Search
              placeholder="input search text"
              onChange={this.change}
              onSearch={this.search}
              style={{ width: 160 }}
            />
          </div>
          <ul>
            {goods.map((item, index) => {
              return (
                <li key={index}>
                  <section className="g_img">
                    <img src={item.gImg} alt="" />
                  </section>
                  <section className="g_info">
                    <p className="g_gIntegral">
                      <span
                        style={
                          memberOne.mIntegral >= goods[index].gIntegral
                            ? { color: "#E4393C" }
                            : {}
                        }
                      >
                        {item.gIntegral}
                      </span>
                      &nbsp;积分
                      <span
                        style={
                          memberOne.mIntegral >= goods[index].gIntegral
                            ? { visibility: "hidden" }
                            : {}
                        }
                      >
                        积分不足
                      </span>
                    </p>
                    <p className="g_gTitle">{item.gTitle}</p>
                    <div className="g_btn">
                      <InputNumber
                        min={1}
                        max={Math.floor(
                          memberOne.mIntegral / goods[index].gIntegral
                        )}
                        defaultValue={1}
                        ref="inputNumber"
                        onChange={e => {
                          this.setState({
                            num: e
                          });
                        }}
                      />
                      <Button
                        type={
                          memberOne.mIntegral >= goods[index].gIntegral
                            ? "primary"
                            : ""
                        }
                        loading={this.state.loading}
                        onClick={
                          memberOne.mIntegral >= goods[index].gIntegral
                            ? _.throttle(() => {
                                this.excClick(index);
                              }, 1000)
                            : () => {
                                message.error("积分不足");
                              }
                        }
                      >
                        立即兑换
                      </Button>
                    </div>
                  </section>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
