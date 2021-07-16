import React, { Component } from 'react';
import TaskControl from './component/TaskControl'
import TaskForm from './component/TaskForm'
import TaskList from './component/TaskList';

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
			isDisplayForm: false,
			item: null,
			filter: {
				name: '',
				status: -1
			},
			keyword: '',
			sort: {
				by: 'name',
				value: 1
			}
		}
	}
	componentDidMount() {
		if (localStorage?.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			})
		}
	}
	randomKey = () => {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	onClickAdd = () => {
		if (this.state.isDisplayForm && this.state.item !== null) {
			this.setState({
				item: null,
				isDisplayForm: true
			});
		} else {
			this.setState({
				item: null,
				isDisplayForm: false
			});
		}

	}
	onSubmitTask = (data) => {
		const { tasks } = this.state
		if (data.id !== '') {
			tasks.forEach(item => {
				if (item.id === data.id) {
					item.name = data.name;
					item.status = data.status
				}
			});
		} else if (data.id === '') {
			data.id = this.randomKey();
			tasks.push(data);
		}
		this.setState({
			tasks: tasks
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}
	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		tasks.forEach(item => {
			if (item.id === id) {
				item.status = !item.status;
			}
		});
		this.setState({
			tasks: tasks
		})
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	onDeleteTask = (id) => {
		var { tasks } = this.state;
		tasks = tasks.filter((item) => {
			return item.id !== id;
		});
		this.setState({
			tasks: tasks
		})
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	onUpdate = (id) => {
		this.onClickAdd();
		var { tasks } = this.state;
		var items = tasks.find((i) => { return i.id === id });
		this.setState({
			item: items,
			isDisplayForm: true
		});
	}
	OpenForm = () => {
		this.setState({
			item: { id: '', name: '', status: false },
			isDisplayForm: true
		})
	}
	CloseForm = () => {
		this.setState({
			item: null,
			isDisplayForm: false
		})
	}
	onFilter = (filterName, filterStatus) => {
		console.log(filterName, typeof +filterStatus)
		filterStatus = +filterStatus;
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})
	}
	onSearch = (keyword) => {
		this.setState({
			keyword: keyword.trim()
		})
	}
	onSort = (sort) => {
		this.setState({
			sort: {
				by: sort.sortby,
				value: sort.sortvalue
			}
		})
		console.log(this.state.sort)
	}
	render() {
		var { tasks, isDisplayForm, filter, keyword, sort } = this.state;
		if (filter.name !== null) {
			var temp = tasks.filter((task) => {
				return task.name.toLowerCase().includes(filter.name.trim()) === true;
			})
			if (filter.status === -1) {
				tasks = temp;
			} else if (filter.status === 1) {
				tasks = temp.filter((item) => { return item.status === true })
			} else {
				tasks = temp.filter((item) => { return item.status === false })
			}
		}
		if (keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().includes(keyword) === true;
			})
		}
		if (sort.by === 'name') {
			tasks.sort((a, b) => {
				if (a.name > b.name) return sort.value;
				else if (a.name < b.name) return -sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sort.value;
				else if (a.status < b.status) return sort.value;
				else return 0;
			});
		}
		return (
			<div className="container">
				<div className="row" style={{ borderBottom: '2px solid gray' }}>
					<div className="col-12">
						<h1 className=" text-center mb-3 mt-3">Quản lý công việc</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4">
						{isDisplayForm ?
							<TaskForm
								onSubmit={this.onSubmitTask}
								onClickClose={this.CloseForm}
								item={this.state.item}
							/>
							: null}
					</div>
					<div className={isDisplayForm ? 'col-8' : 'col-12'}>
						<div className="row mt-5">
							<div className="col-12">
								<button
									className="btn btn-primary"
									type="button"
									onClick={this.OpenForm}
								>
									<span><i className="fas fa-plus"></i></span>
									Thêm công việc
								</button>
							</div>
							<TaskControl
								onSearch={this.onSearch}
								onSort={this.onSort}
							/>
							<TaskList
								tasks={tasks}
								onUpdateStatus={this.onUpdateStatus}
								onDeleteTask={this.onDeleteTask}
								onUpdate={this.onUpdate}
								onFilter={this.onFilter}
							/>
						</div>
					</div>
				</div>

			</div>
		);

	}
}


