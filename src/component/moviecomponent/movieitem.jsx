import React from 'react'
import {Link,Route} from 'react-router-dom'
import style from '../../css/movieitem.less'
import { Rate } from 'antd'
export default class Movieitem extends React.Component {
	constructor(props){
		super(props)
		this.state={}
	}
	render(){
		return <Link className={style.item} to={'/movie/detail/'+this.props.id}>
			<img src={this.props.images.small}/>
			<h5><strong>名称：</strong>{this.props.title}</h5>
			<h5><strong>上映年份：</strong>{this.props.year}年</h5>
			<h5><strong>电影类型：</strong>{this.props.genres.join('，')}</h5>
			<Rate disabled defaultValue={this.props.rating.average/2} />
		</Link>
	}
}