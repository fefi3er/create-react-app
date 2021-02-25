import './App.css'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('counter')
@observer
class App extends Component {
	render() {
		const { total, totaled, apples, eat, find, flag } = this.props.counter
		return (
			<div className="App">
				<div className="box">
					<div className="table">
						<div className="header">苹果篮子</div>
						<div className="tab">
							<div>
								<div>当前</div>
								<div>{total}</div>
							</div>
							<div>
								<div>已吃掉</div>
								<div>{totaled}</div>
							</div>
						</div>
						<div className="body">
							{apples.map((item, index) => {
								return (
									<div className="content" key={index}>
										<div className="pic"></div>
										<div className="title">红苹果</div>
										<div className="info">{item.info}</div>
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
