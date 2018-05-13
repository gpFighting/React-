//这是根组件
import React from 'react'
import {HashRouter, Route, Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import style from './css/logo.less'
import Home from './component/Home.jsx'
import Movie from './component/Movie.jsx'
import About from './component/About.jsx'
export default class App extends React.Component {
	constructor(props){
		super(props)
		this.state={}
	}
	render(){
		return <HashRouter>
			<Layout className="layout" style={{height: '100%'}}>
		    <Header>
		      <div className={style.logo} />
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={[location.hash.split('/')[1] || "home"]}            
		        style={{ lineHeight: '64px' }}
		      >
		        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
		        <Menu.Item key="movie"><Link to="/movie/in_theaters/1">电影</Link></Menu.Item>
		        <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
		      </Menu>
		    </Header>
		    <Content style={{ backgroundColor: '#fff' }}>
		      <Route path="/home" component={Home}></Route>
		      <Route path="/Movie" component={Movie}></Route>
		      <Route path="/about" component={About}></Route>
		    </Content>
		    <Footer style={{ textAlign: 'center' }}>
		      douban movie ©2018 Created by gpfighting 
		    </Footer>
		  </Layout>
		</HashRouter>
	}
}