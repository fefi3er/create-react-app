import { action, observable } from 'mobx'

class CounterStore {
	@observable count = 0
	@observable apples = []
	@observable appled = []
	@observable total = 0
	@observable totaled = 0
	@observable eated = 0
	@observable flag = false

	@action.bound eat(index) {
		this.apples[index].eating = true
		setTimeout(() => {
			this.eated ++
			this.totaled += this.apples[index].info
			this.total -= this.apples[index].info
			this.apples.splice(index, 1)
		}, 700)
	}

	@action.bound find() {
		this.flag = true
		let info = parseInt(200 + Math.random() * 20)
		this.count++
		let obj = {
			id: this.count,
			info: info,
			eating : false
		}
		setTimeout(() => {
			this.apples.push(obj)
			this.total += obj.info
			this.flag = false
		}, 700)
	}
}

const counter = new CounterStore()

export default counter
