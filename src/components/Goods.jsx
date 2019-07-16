import React, { Component } from "react";

import {
  List,
  Avatar,
  Button,
  Drawer,
  Form,
  Input,
  Icon,
  message,
  Modal
} from "antd";

import {
  getGoods,
  addGoods,
  delGoods,
  getGoodsOne,
  updateGoods
} from "../api/index";
import "../css/Goods.scss";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

export default class Goods extends Component {
  state = {
    goods: [],
    goodsOne: { gTitle: "1", gIntegral: 1, gDetail: "1", gImg: "1" },
    visible: false,
    visibleModal: false,
    showIden: true,
    objectId: ""
  };

  componentWillMount() {
    this.getGoodsInfo();
  }
  //   获取商品
  async getGoodsInfo() {
    let goods = await getGoods();
    this.setState({
      goods: goods.reverse()
    });
  }
  //   获取一个商品信息
  async getGoodsOne() {
    let goodsOne = await getGoodsOne(this.state.objectId);
    this.setState({
      goodsOne: JSON.parse(JSON.stringify(goodsOne))
    });
  }
  //   添加商品
  addGoods = () => {
    let gTitle = this.refs.gTitle.state.value;
    let gIntegral = this.refs.gIntegral.state.value * 1;
    let gDetail = this.refs.gDetail.state.value;
    let gImg = this.refs.gImg.state.value;
    addGoods(gTitle, gIntegral, gDetail, gImg);
    this.getGoodsInfo();
    this.setState({
      visible: false
    });
  };
  //   删除商品
  delGoods = objectId => {
    delGoods(objectId);
    let { goods } = this.state;
    let obj = goods.find(item => item.objectId === objectId);
    let idx = goods.indexOf(obj);
    goods.splice(idx, 1);
    this.setState({
      goods
    });
  };
  // 搜索商品
  search = async value => {
    if (value === "") {
      message.error("请输入关键字");
      return false;
    }
    let arr = await getGoods();
    let obj = arr.filter(item => item.gTitle === value);
    if (obj * 1 !== [] * 1) {
      this.setState({
        goods: obj
      });
    } else {
      message.error("查找不到该用户");
    }
  };
  change = e => {
    if (e.target.value === "") {
      this.getGoodsInfo();
    }
  };
  //   修改商品
  updateGoods = objectId => {
    this.setState(
      {
        visible: true,
        showIden: false,
        objectId
      },
      () => {
        this.getGoodsOne();
      }
    );
  };
  //   修改商品确定
  updateGoodsOk = () => {
    let gTitle = this.refs.gTitle.state.value;
    let gIntegral = this.refs.gIntegral.state.value * 1;
    let gDetail = this.refs.gDetail.state.value;
    let gImg = this.refs.gImg.state.value;
    updateGoods(this.state.objectId, gTitle, gIntegral, gDetail, gImg);
    this.getGoodsInfo();

    let goods = this.state.goods;
    let goodobj = goods.find(item => item.objectId === this.state.objectId);
    let idx = goods.indexOf(goodobj);
    goodobj.gTitle = gTitle;
    goodobj.gIntegral = gIntegral;
    goodobj.gDetail = gDetail;
    goodobj.gImg = gImg;
    goods.splice(idx, 1, goodobj);

    this.setState({
      goods,
      visible: false
    });
  };
  updeChange = (title, e) => {
    let { goodsOne } = this.state;
    goodsOne[title] = e.target.value;
    this.setState({
      goodsOne
    });
  };
  //   点击获取商品详情
  goodsDetail = objectId => {
    this.setState(
      {
        objectId,
        visibleModal: true
      },
      () => {
        this.getGoodsOne();
      }
    );
  };
  handleCancel = e => {
    this.setState({
      visibleModal: false
    });
  };
  showDrawer = () => {
    this.setState({
      goodsOne: {},
      visible: true,
      showIden: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { Search } = Input;
    const { goods, goodsOne } = this.state;

    return (
      <div className="goods p20">
        <div className="inp">
          <Search
            placeholder="根据姓名搜索"
            enterButton="Search"
            size="default"
            allowClear={true}
            onChange={this.change}
            onSearch={this.search}
          />
          <Button type="primary" onClick={this.showDrawer}>
            <Icon type="plus" /> 新增商品
          </Button>
          <Drawer
            title={this.state.showIden ? "添加商品" : "修改商品"}
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Form {...formItemLayout}>
              <Form.Item
                label="商品名称"
                required="true"
                whitespace="false"
                validateStatus="success"
              >
                <Input
                  placeholder="Please input goods title!"
                  ref="gTitle"
                  id="success"
                  value={this.state.goodsOne.gTitle}
                  onChange={this.updeChange.bind(this, "gTitle")}
                />
              </Form.Item>
              <Form.Item
                label="商品积分"
                required="true"
                whitespace="false"
                validateStatus="success"
              >
                <Input
                  placeholder="Please input goods integral!"
                  ref="gIntegral"
                  id="success"
                  value={this.state.goodsOne.gIntegral}
                  onChange={this.updeChange.bind(this, "gIntegral")}
                />
              </Form.Item>
              <Form.Item
                label="商品描述"
                required="true"
                whitespace="false"
                validateStatus="success"
              >
                <Input
                  placeholder="Please input goods detail!"
                  ref="gDetail"
                  id="success"
                  value={this.state.goodsOne.gDetail}
                  onChange={this.updeChange.bind(this, "gDetail")}
                />
              </Form.Item>
              <Form.Item
                label="商品图片地址"
                required="true"
                whitespace="false"
                validateStatus="success"
              >
                <Input
                  placeholder="Please input Picture Address of Commodity!"
                  ref="gImg"
                  id="success"
                  value={this.state.goodsOne.gImg}
                  onChange={this.updeChange.bind(this, "gImg")}
                />
              </Form.Item>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "center"
              }}
            >
              <Button
                onClick={
                  this.state.showIden ? this.addGoods : this.updateGoodsOk
                }
                type="primary"
              >
                确定
              </Button>
            </div>
          </Drawer>
        </div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={goods}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  href="javascrip:;"
                  onClick={() => {
                    this.delGoods(item.objectId);
                  }}
                >
                  删除
                </a>,
                <a
                  href="javascrip:;"
                  onClick={() => {
                    this.updateGoods(item.objectId);
                  }}
                >
                  修改
                </a>
              ]}
            >
              <List.Item.Meta
                onClick={() => {
                  this.goodsDetail(item.objectId);
                }}
                avatar={<Avatar src={item.gImg} />}
                title={<p>{item.gTitle}</p>}
                description={item.gDetail}
              />
            </List.Item>
          )}
        />
        <Modal
          title={goodsOne.gTitle}
          visible={this.state.visibleModal}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>积分：{goodsOne.gIntegral}</p>
          <p>商品详情：{goodsOne.gDetail}</p>
          <p>
            <img src={goodsOne.gImg} alt="" />
          </p>
        </Modal>
      </div>
    );
  }
}
