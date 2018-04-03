import React from 'react';
import {Radio, Table} from 'antd';

const RadioGroup = Radio.Group;

export default class Rank extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 'meituan'
		}
	}

	render() {
		const {data} = this.props;
		(data.meituan || []).forEach((item, index) => item.key = index);
		(data.ele || []).forEach((item, index) => item.key = index);

		const columns = [
			{title: '排名', dataIndex: 'ranking'},
			{title: 'uid', dataIndex: 'userId'},
			{title: '贡献数量', dataIndex: 'count'}
		];

		return (
			<div>
				<div style={{paddingBottom: '15px'}}>
					<RadioGroup onChange={e => this.setState({value: e.target.value})} value={this.state.value}>
						<Radio value="meituan">美团贡献榜</Radio>
						<Radio value="ele">饿了么贡献榜</Radio>
					</RadioGroup>
				</div>
				<Table dataSource={data[this.state.value]} columns={columns} pagination={false} />
			</div>
		);
	}
}
