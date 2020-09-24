import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// icon
import { UserOutlined } from '@ant-design/icons';
// antd
import { Menu } from "antd";
// 路由
import Router from "../../router/index";
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }

    // 生命周期，在这里多了一层接口请求，并过滤路由

    // 无子级菜单处理
    renderMenu = ({ title, key }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }

    // 子级菜单处理
    renderSubMenu = ({ title, key, child }) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
                    })
                }
            </SubMenu>
        )
    }
    componentDidMount() {

        const pathname = this.props.location.pathname
        const menuKey = pathname.split("/").slice(0, 3).join("/")
        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menuKey,
        }
        this.selectMenuHigh(menuHigh)
    }
    /* 操作菜单 */
    selectMenu = ({ item, key, keyPath, domEvent }) => {
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]  // the last el in the array
        }
        this.selectMenuHigh(menuHigh)
    }
    /* 菜单封装 */
    selectMenuHigh = ({ selectedKeys, openKeys }) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]  // the last el in the array
        })

    }
    onopenMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    render() {
        const { selectedKeys, openKeys } = this.state;
        return (
            <Fragment>
                <Menu
                    onOpenChange={this.onopenMenu}
                    onClick={this.selectMenu}
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu);