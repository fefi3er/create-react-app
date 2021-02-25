import './App.css'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('counter')
@observer
class App extends Component {
	render() {
		const { total, totaled, apples, eat, find, flag ,eated} = this.props.counter
		return (
			<div className="App">
				<div className="box">
					<div className="table">
						<div className="header">苹果篮子</div>
						<div className="tab">
							<div>
								<div>当前</div>
								<div>{apples.length}个苹果，{total}克</div>
							</div>
							<div>
								<div>已吃掉</div>
								<div>{eated}个，{totaled}克</div>
							</div>
						</div>
						<div className="body">
							{apples.map((item, index) => {
								return (
									<div className="content" key={index}>
										<div className="pic"></div>
										<div className="title">红苹果 - {item.id}号</div>
										<div className="info">{item.info}克</div>
										{item.eating && (
											<div className="btn2">
												正在吃
											</div>
										)}
										{!item.eating && (
											<div className="btn" onClick={() => eat(index)}>
												吃掉
											</div>
										)}
									</div>
								)
							})}
							{!flag && (
								<div className="btnSub" onClick={() => find()}>
									摘苹果
								</div>
							)}
							{flag && <div className="btnSub2">正在摘取</div>}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
