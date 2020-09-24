import React, { Component } from "react";
//css 
import "./aside.scss";
//
import { MenuUnfoldOutlined } from "@ant-design/icons"
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.collapsed
        };
    }
    toggleMenu = () => {
        this.props.toggle();
    }
    // 生命周期监听父级props
    componentWillReceiveProps({ collapsed }) {
        this.setState({
            collapsed: collapsed
        })
    }
    render() {
        const { collapsed } = this.state;
        return (
            <div className={collapsed ? "collapsed-close" : ""}>
                <h1 className="logo"><span>LOGO</span></h1>
                <div className="header-wrap">
                    <span className="collapsed-icon" onClick={this.toggleMenu}>
                        <MenuUnfoldOutlined />
                    </span>
                </div>
            </div>
        )
    }
}

export default Index;