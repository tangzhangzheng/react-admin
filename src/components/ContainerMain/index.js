import React from 'react';
import { Switch } from 'react-router-dom';
// 组件

// 私有路由组件
import PrivateRouter from "../privateRouter/index";
// 自动化工程
import components from './component'


class ContainerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        {components.map(({ path, component }) => { return <PrivateRouter exact key={path} path={path} component={component} /> })}
      </Switch>
    )
  }
}
export default ContainerMain;
