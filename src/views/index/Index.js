import React, { Component } from "react";
// layout组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import ContainerMain from "../../components/ContainerMain/index";
// css
import "./index.scss";
// antd
import { Layout } from 'antd';
const { Sider, Header, Content } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }
    componentDidMount() {
        const SessionOfCollapsed = JSON.parse(sessionStorage.getItem("collapsed"));
        // console.log(SessionOfCollapsed)
        this.setState({ collapsed: SessionOfCollapsed })
    }
    toggleCollapse = () => {
        const collapsed = !this.state.collapsed
        this.setState({ collapsed });
        sessionStorage.setItem("collapsed", collapsed)
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader toggle={this.toggleCollapse} collapsed={this.state.collapsed} /></Header>
                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}><LayoutAside /></Sider>
                    <Content className="layout-main">
                        <ContainerMain />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;