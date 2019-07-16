import React, { Component } from "react";
import { Table } from "antd";
import { getExchange } from "../api/index";
export default class Exrecord extends Component {
  state = {
    egData: []
  };
  async componentWillMount() {
    console.log(this.props.match.params.id);
    let exchange = await getExchange();
    let exchangeObj = exchange.find(
      item => item.emObjectId === this.props.match.params.id
    );
    this.setState({
      egData: exchangeObj ? exchangeObj.egData : []
    });
  }
  render() {
    const columns = [
      {
        title: "商品名称",
        dataIndex: "gName",
        key: "gName",
        render: text => <small>{text}</small>
      },
      {
        title: "兑换次数",
        dataIndex: "gNum",
        key: "gNum",
        render: text => <small>{text}</small>
      },
      {
        title: "兑换时间",
        dataIndex: "gTime",
        key: "gTime"
      }
    ];
    return (
      <div className="p20">
        <Table columns={columns} dataSource={this.state.egData} />
      </div>
    );
  }
}
