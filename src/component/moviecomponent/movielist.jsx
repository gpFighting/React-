import React from 'react'
import { Spin, Alert,Pagination } from 'antd'
import fetchJsonp from 'fetch-jsonp'
import Movieitem from './movieitem.jsx'
export default class Movielist extends React.Component {
	constructor(props){
		super(props)
		this.state={
			isloading: true,
			movies: [],
			type: props.match.params.type,
			page: parseInt(props.match.params.page) || 1,
			total: 0,
			count: 12,
			start: parseInt(props.match.params.page-1)*12
		}
	}
	componentWillMount(){
		this.getMovieList()
		// console.log(this.props)
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		this.setState({
			isloading: true,
			page: parseInt(nextProps.match.params.page),
			type: nextProps.match.params.type,
			start: this.state.count*(nextProps.match.params.page-1)
		},function (){
			this.getMovieList()
		})
		
	}
	render(){
		{if (this.state.isloading) {
			return <Spin >
		    <Alert
		      message="电影列表正在加载中，请耐心等待"
		      description="不要走开，精彩马上呈现..."
		      type="info"
		    />
  	</Spin>
		}else {
			return <div style={{display: 'flex',flexWrap: 'wrap' }}>
				{this.state.movies.map(item=>{
				return <Movieitem {...item} key={item.id}></Movieitem>
			})}
				<Pagination showQuickJumper defaultCurrent={this.state.page} pageSize={this.state.count} total={this.state.total} onChange={this.changelist} />
			</div>
		}}
	}
	getMovieList=()=>{
		var url = `https://api.douban.com/v2/movie/${this.state.type}?start=${this.state.start}&count=${this.state.count}`
		fetchJsonp(url)
		.then(res=>res.json())
		.then(data=>{
			// console.log(data)
			this.setState({
				isloading: false,
				movies: data.subjects,
				total: data.total,
				start: this.state.count*(this.state.page-1)
			})
		})
		/*setTimeout(()=>{
		const data = require(`../../test/${this.state.type}.json`)
			this.setState({
				isloading: false,
				movies: data.subjects,
				total: data.total,
				start: this.state.count*(this.state.page-1)
			})
		},800)*/
	}
	changelist=(page,count)=> {
	  // location.href=`/#/movie/${this.state.type}/${page}`
	  this.props.history.push('/movie/'+this.state.type+'/'+page)
	}
}