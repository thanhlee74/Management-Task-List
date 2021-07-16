import React, { Component } from 'react'

export default class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id)
    }
    onSelectedItem = () => {
        this.props.onSelectedItem(this.props.task.id)
    }

    render() {
        return (
            <tr>
                <td className="text-center">{this.props.index}</td>
                <td className="text-capitalize">{this.props.task.name}</td>
                <td className="text-center">
                    <span
                        className={this.props.task.status ? 'badge bg-success text-wrap' : 'badge bg-warning text-wrap'}
                        onClick={this.onUpdateStatus}
                    >
                        {this.props.task.status ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning"
                        onClick={this.onSelectedItem}
                    >
                        <span className="fas fa-edit"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger"
                        onClick={this.onDeleteItem}
                    >
                        <span className="fas fa-trash "></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

