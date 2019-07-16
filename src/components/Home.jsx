import React, { Component } from "react";
import { Descriptions, Icon } from "antd";
import "../css/Home.scss";
export default class Home extends Component {
  state = {
    user: {}
  };
  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("bmob"));
    if (user) {
      this.setState({
        user
      });
    }
  }
  render() {
    let user = this.state.user;
    return (
      <div className="home p20">
        <Descriptions title="当前管理员" column={4}>
          <Descriptions.Item label="姓名"> {user.username}</Descriptions.Item>
          <Descriptions.Item label="头衔">程序员</Descriptions.Item>
          <Descriptions.Item label="部门">
            信息系统部大数据清洗组(LTD000001)
          </Descriptions.Item>
          <Descriptions.Item label="电子邮件">share@163.com</Descriptions.Item>

          <Descriptions.Item label="城市">北京</Descriptions.Item>
          <Descriptions.Item label="地址">学院路234号</Descriptions.Item>
          <Descriptions.Item label="手机"> 186****8888</Descriptions.Item>
          <Descriptions.Item label="职业">OT0000(OT000001)</Descriptions.Item>
          <Descriptions.Item label="负责"> S0000(RT000001)</Descriptions.Item>
          <Descriptions.Item label="目前工资等级">
            SG0000(SG000001)
          </Descriptions.Item>
          <Descriptions.Item label="工资账户">6226 7788 9908</Descriptions.Item>
          <Descriptions.Item label="最后更新时间">2019-05-19</Descriptions.Item>
          <Descriptions.Item label="当前状态">JOB_APPLIED</Descriptions.Item>
          <Descriptions.Item label="雇佣终止">暂无</Descriptions.Item>
        </Descriptions>
        <div className="content">
          <ul className="lists">
            <li>
              <Icon type="pie-chart" />
              <div>
                <p>收藏</p>
                <p>301</p>
              </div>
            </li>
            <li>
              <img src="" alt="" />
              <div>
                <p>照片</p>
                <p>802</p>
              </div>
            </li>
            <li>
              <img src="" alt="" />
              <div>
                <p>云数据</p>
                <p>30122</p>
              </div>
            </li>
            <li>
              <img src="" alt="" />
              <div>
                <p>邮件</p>
                <p>102</p>
              </div>
            </li>
          </ul>
          <div className="renwu">
            <h3>消息栏</h3>
            <ul>
              <li>
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562678737&di=55d008246e2f90ce5e1003e35522a04f&src=http://n.sinaimg.cn/sinacn/w620h620/20180307/2953-fxipenp2950377.jpg"
                  alt=""
                />
                <div>
                  <p>名人</p>
                  <p>终于当上火影了！</p>
                </div>
              </li>
              <li>
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562678737&di=55d008246e2f90ce5e1003e35522a04f&src=http://n.sinaimg.cn/sinacn/w620h620/20180307/2953-fxipenp2950377.jpg"
                  alt=""
                />
                <div>
                  <p>名人</p>
                  <p>终于当上火影了！</p>
                </div>
              </li>
              <li>
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562678737&di=55d008246e2f90ce5e1003e35522a04f&src=http://n.sinaimg.cn/sinacn/w620h620/20180307/2953-fxipenp2950377.jpg"
                  alt=""
                />
                <div>
                  <p>名人</p>
                  <p>终于当上火影了！</p>
                </div>
              </li>
              <li>
                <img
                  src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562678737&di=55d008246e2f90ce5e1003e35522a04f&src=http://n.sinaimg.cn/sinacn/w620h620/20180307/2953-fxipenp2950377.jpg"
                  alt=""
                />
                <div>
                  <p>名人</p>
                  <p>终于当上火影了！</p>
                </div>
              </li>
            </ul>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
