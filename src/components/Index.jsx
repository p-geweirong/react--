import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Icon, Button, Dropdown } from "antd";
// import { getUser } from "../api/index";
import "../css/Index.scss";
import Home from "./Home";
import User from "./User";
import Member from "./Member";
import Goods from "./Goods";
import Exchange from "./Exchange";
import Exrecord from "./Exrecord";
export default class Index extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub3"];
  state = {
    openKeys: [],
    collapsed: false,
    user: {}
  };
  toggleCollapsed = () => {
    this.setState({
      openKeys: [],
      collapsed: !this.state.collapsed
    });
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  componentWillMount() {
    // let objectId = this.props.location.state.objectId;
    // getUser(objectId);
    let user = JSON.parse(localStorage.getItem("bmob"));
    if (user) {
      this.setState({
        user
      });
    } else {
      this.props.history.replace("/");
      // console.log(this.props);
    }
  }
  logout = () => {
    localStorage.clear();
  };
  render() {
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;
    let { user } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link to="/" onClick={this.logout}>
            退出登录
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <Menu.Item key="1">
              <Link to="/index">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>会员管理</span>
                </span>
              }
            >
              <Menu.Item key="2">
                <Link to="/index/member">会员</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <Link to="/index/goods">
                <Icon type="pie-chart" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="mail" />
                  <span>员工管理</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to="/index/user">员工</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: this.state.collapsed ? 80 : 200,
            transition: "all 0.2s",
            background: "#f0f2f5"
          }}
        >
          <header>
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
            >
              <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
            </Button>
            <div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <p className="ant-dropdown-link">
                  {user.username}&nbsp;
                  <Icon type="down" />
                </p>
              </Dropdown>
            </div>
          </header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Switch>
              <Route path="/index" exact component={Home} />
              <Route path="/index/user" component={User} />
              <Route path="/index/member" component={Member} />
              <Route path="/index/goods" component={Goods} />
              <Route path="/index/exchange/:id" component={Exchange} />
              <Route path="/index/exrecord/:id" component={Exrecord} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
