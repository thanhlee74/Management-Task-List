import React, { Component } from 'react'

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.item !== null) {
            if (props.item.id !== state.id) {
                return {
                    id: props.item.id,
                    name: props.item.name,
                    status: props.item.status
                }

            }
        }
        return state
    }
    onClickClose = () => {
        this.props.onClickClose()
        this.onClear()
    }
    onChangeHandle = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }
    onSave = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        // this.onClickClose();
    }
    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }
    render() {
        return (
            <div className="card border-primary mb-3 mt-5 form-control p-0">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            {this.props.item.id !== '' ? <h3>Cập nhật công việc</h3> :
                                <h3>Thêm công việc</h3>}
                        </div>
                        <div className="col-2">
                            <span
                                className="fas fa-window-close ms-4"
                                onClick={this.onClickClose}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body text-primary">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label className="mb-2">Tên:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={this.onChangeHandle}
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="mb-2" >Trạng thái:</label>
                            <select name="status" id="" className="form-select"
                                onChange={this.onChangeHandle}
                                value={this.state.status}
                            >
                                <option value={false}>Ẩn</option>
                                <option value={true}>Kích hoạt</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success mt-3 col-5 me-5 ms-2" type="submit"><i className="fas fa-plus" ></i>Lưu lại</button>
                            <button className="btn btn-danger mt-3 col-5" type="button" onClick={this.onClear}><i className="fas fa-times"></i>Hủy bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

