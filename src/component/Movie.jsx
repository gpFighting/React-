import React from 'react'
import { Layout, Menu} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout
import {Route, Link, Switch} from 'react-router-dom'
import Movielist from './moviecomponent/movielist.jsx'
import Detail from './moviecomponent/detail.jsx'
export default class Movie extends React.Component {
	constructor(props){
		super(props)
		this.state={}
	}
	render(){
		return <Content >
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.hash.split('/')[2]]}
            style={{ height: '100%' }}
          >
           <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
           <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
           <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280}}>
        	<Switch>
        		<Route path="/movie/detail/:id" exact component={Detail}></Route>
        		<Route path="/movie/:type/:page" component={Movielist} exact></Route>
        	</Switch>       	
        </Content>
      </Layout>
    </Content>
	}
}