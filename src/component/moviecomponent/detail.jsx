import React from 'react'
import { Button, Radio, Icon } from 'antd'
import fetchJsonp from 'fetch-jsonp'

export default class Detail extends React.Component {
	constructor(props){
		super(props)
		this.state={
			des: {}
		}
	}
	componentWillMount(){
		this.getdetail()
	}
	render(){
		console.log(this.props)
		return <div>
			<Button type="primary" onClick={this.back}>
        <Icon type="left" />返回电影列表页面
      </Button>
      <div style={{textAlign: 'center'}}>
      	<div><img src={this.state.des.img} alt=""/></div>
      	<p style={{textAlign: 'left',textIndent: '2em',lineHeight: '30px',marginTop: '10px'}}>{this.state.des.content}</p>
      </div>
		</div>
	}
	back=()=>{
		this.props.history.go(-1)
	}
	getdetail=()=>{
		fetchJsonp('https://api.douban.com/v2/movie/subject/'+this.props.match.params.id)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			this.setState({
				des: {
					img: data.images.small,
					content: data.summary
				}
			})
		})
	}
}