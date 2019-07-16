import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Icon,
  Input,
  message,
  Button,
  Modal,
  Tooltip,
  Popconfirm
} from "antd";
import { getMember, addMember, delMember, updateMember } from "../api/index";
import "../css/Member.scss";
export default class Member extends Component {
  state = {
    members: [],
    columns: [
      {
        title: "姓名",
        dataIndex: "mName",
        render: text => <small>{text}</small>
      },
      {
        title: "积分",
        dataIndex: "mIntegral",
        render: text => <small>{text}</small>
      },
      {
        title: "电话",
        dataIndex: "mPhoneNumber",
        render: text => <small>{text}</small>
      },
      {
        title: "邮箱",
        dataIndex: "mEmail",
        render: text => <small>{text}</small>
      },
      {
        title: "Action",
        dataIndex: "",
        key: "key",
        render: key => (
          <div className="member_action">
            <Tooltip title="修改该会员">
              <Icon type="edit" onClick={this.update.bind(this, key)} />
            </Tooltip>
            <span>/</span>
            <Popconfirm
              title="确定删除？"
              onConfirm={this.del.bind(this, key)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>
            <span>/</span>
            <small>
              <Link to={`/index/exchange/${key.objectId}`}>兑换商品</Link>
            </small>
            <span>/</span>
            <small>
              <Link to={`/index/exrecord/${key.objectId}`}>兑换记录</Link>
            </small>
          </div>
        )
      }
    ],
    visible: false,
    showIden: true,
    updateObj: {
      mName: "q",
      mIntegral: 1,
      mPhoneNumber: 1,
      mEmail: "123"
    }
  };
  componentWillMount() {
    this.getMemberInfo();
  }
  // 获取会员
  async getMemberInfo() {
    let arr = await getMember();
    this.setState({
      members: arr.reverse()
    });
  }
  // 搜索会员
  search = async value => {
    if (value === "") {
      message.error("请输入关键字");
      return false;
    }
    let arr = await getMember();
    let obj = arr.filter(item => item.mName === value);
    if (obj * 1 !== [] * 1) {
      this.setState({
        members: obj
      });
    } else {
      message.error("查找不到该用户");
    }
  };
  change = e => {
    if (e.target.value === "") {
      this.getMemberInfo();
    }
  };
  // 删除会员
  del = key => {
    delMember(key.objectId);
    let memberObj = this.state.members;
    let meobj = memberObj.find(item => item.objectId === key.objectId);
    let idx = memberObj.indexOf(meobj);
    memberObj.splice(idx, 1);
    this.setState({
      members: this.state.members
    });
  };
  // 修改会员和添加会员逻辑
  memberObj = async () => {
    let name = this.refs.name.state.value;
    let integral = this.refs.integral.state.value * 1;
    let phoneNumber = this.refs.phoneNumber.state.value * 1;
    let email = this.refs.email.state.value;
    if (!/^1[3456789]\d{9}$/.test(phoneNumber)) {
      message.error("电话号码错误");
      return false;
    }
    let members = this.state.members;
    let meobj = {};
    meobj.key = "";
    meobj.mName = name;
    meobj.mIntegral = integral;
    meobj.mPhoneNumber = phoneNumber;
    meobj.mEmail = email;
    if (!this.state.showIden) {
      await updateMember(
        this.state.updateObj.objectId,
        name,
        integral,
        phoneNumber,
        email
      );
      let getmeobj = members.find(
        item => item.objectId === this.state.updateObj.objectId
      );
      let idx = members.indexOf(getmeobj);
      members.splice(idx, 1, meobj);
    } else {
      await addMember(name, integral, phoneNumber, email);
      members.unshift(meobj);
    }
    this.setState({
      members,
      visible: false
    });
    this.getMemberInfo();
  };
  // 修改会员
  update = key => {
    this.setState({
      visible: true,
      showIden: false,
      updateObj: JSON.parse(JSON.stringify(key))
    });
  };
  // 修改会员确定按钮
  updateOk = () => {
    this.memberObj();
  };
  updeChange = (title, e) => {
    let { updateObj } = this.state;
    updateObj[title] = e.target.value;
    this.setState({
      updateObj
    });
  };
  // 点击 新增会员 按钮
  showModal = () => {
    this.setState({
      visible: true,
      showIden: true,
      updateObj: {}
    });
  };
  // 新增会员 确定按钮
  handleOk = e => {
    this.memberObj();
  };
  // 新增会员/修改会员 取消按钮
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { Search } = Input;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };
    return (
      <div className="member p20">
        <div className="inp">
          <Search
            placeholder="根据姓名搜索"
            enterButton="Search"
            size="default"
            allowClear={true}
            onChange={this.change}
            onSearch={this.search}
          />
          <Button type="primary" onClick={this.showModal}>
            +增加会员
          </Button>
          <Modal
            title={this.state.showIden ? "增加会员" : "修改会员"}
            visible={this.state.visible}
            onOk={this.state.showIden ? this.handleOk : this.updateOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Input
              placeholder="用户名"
              ref="name"
              value={this.state.updateObj.mName}
              onChange={this.updeChange.bind(this, "mName")}
            />
            <Input
              placeholder="积分"
              ref="integral"
              value={this.state.updateObj.mIntegral}
              onChange={this.updeChange.bind(this, "mIntegral")}
            />
            <Input
              placeholder="电话"
              ref="phoneNumber"
              value={this.state.updateObj.mPhoneNumber}
              onChange={this.updeChange.bind(this, "mPhoneNumber")}
            />
            <Input
              placeholder="邮箱"
              ref="email"
              value={this.state.updateObj.mEmail}
              onChange={this.updeChange.bind(this, "mEmail")}
            />
          </Modal>
        </div>

        <Table
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.members}
        />
      </div>
    );
  }
}
