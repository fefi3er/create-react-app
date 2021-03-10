import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="box">
						<div className="tabs">
							<NavLink to="/Login" activeClassName="active">
								登录
							</NavLink>
							<b>·</b>
							<NavLink to="/Logout" activeClassName="active">
								注册
							</NavLink>
						</div>
						<Route path="/Login" component={Login}></Route>
						<Route path="/Logout" component={Logout}></Route>
					</div>
				</div>
			</Router>
		)
	}
}
function Login() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: false,
		},
		validate: (values) => {
			const errors = {}
			if (!values.email) {
				errors.txt = '请输入邮箱'
			} else if (values.email.indexOf('@') === -1 || values.email.indexOf('.') === -1) {
				errors.txt = '邮箱格式有误'
			} else if (!values.password) {
				errors.txt = '请输入密码'
			} else if (values.password.length < 8 || values.password.length > 15) {
				errors.txt = '密码长度在8~14位之间'
			}
			return errors
		},
		onSubmit: (values) => {
			axios({
				method: 'POST',
				url: 'https://conduit.productionready.io/api/users/login',
				data: {
					user: {
						email: values.email,
						password: values.password,
					},
				},
			})
				.then((data) => {
					alert('登录成功!')
					console.log(data)
				})
				.catch((err) => {
					alert('登录失败!')
					console.log(err)
				})
		},
	})
	return (
		<form onSubmit={formik.handleSubmit} className="form">
			<input
				type="text"
				className="input"
				name="email"
				placeholder="邮箱"
				value={formik.values.email}
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
			></input>
			<input
				type="password"
				className="input"
				name="password"
				placeholder="密码"
				value={formik.values.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			></input>
			<input
				type="checkbox"
				id="checkbox"
				name="remember"
				value={formik.values.remember}
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
			/>
			<label className="checkbox" htmlFor="checkbox">
				记住我
			</label>
			<p className={formik.errors.txt ? 'show' : ''}>{formik.errors.txt}</p>
			<input type="submit" className="btn" value="登录" />
		</form>
	)
}
function Logout() {
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors = {}
			if (!values.username) {
				errors.txt = '请设置昵称'
			} else if (values.username.length > 15) {
				errors.txt = '昵称的长度不能大于15'
			} else if (!values.email) {
				errors.txt = '请设置邮箱'
			} else if (values.email.indexOf('@') === -1 || values.email.indexOf('.') === -1) {
				errors.txt = '邮箱格式错误'
			} else if (!values.password) {
				errors.txt = '请设置密码'
			} else if (values.password.length < 8 || values.password.length > 15) {
				errors.txt = '密码长度在8~14位之间'
			}
			return errors
		},
		onSubmit: (values) => {
			axios({
				method: 'POST',
				url: 'https://conduit.productionready.io/api/users',
				data: {
					user: {
						username: values.username,
						email: values.email,
						password: values.password,
					},
				},
			})
				.then((data) => {
					alert('注册成功!')
					console.log(data)
				})
				.catch((err) => {
					alert('注册失败!')
					console.log(err)
				})
		},
	})
	return (
		<form onSubmit={formik.handleSubmit} className="form">
			<input
				type="text"
				className="input"
				name="username"
				placeholder="你的昵称"
				value={formik.values.username}
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
			></input>
			<input
				type="text"
				id="email"
				className="input"
				name="email"
				placeholder="邮箱"
				onBlur={formik.handleBlur}
				value={formik.values.email}
				onChange={formik.handleChange}
			></input>
			<input
				type="password"
				className="input"
				name="password"
				placeholder="设置密码"
				onBlur={formik.handleBlur}
				value={formik.values.password}
				onChange={formik.handleChange}
			></input>
			<p className={formik.errors.txt ? 'show' : ''}>{formik.errors.txt}</p>
			<input type="submit" id="submit" className="btn" value="注册" />
		</form>
	)
}

export default App
