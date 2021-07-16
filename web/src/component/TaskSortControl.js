import React, { Component } from 'react'

export default class TaskSortControl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sort: {
                sortby: 'name',
                sortvalue: 1
            }
        }

    }

    setStateAsync(sortby, sortvalue) {
        return this.setState({
            sort: {
                sortby: sortby,
                sortvalue: sortvalue
            }
        })
    }
    onClick = async (sortby, sortvalue) => {
        await this.setStateAsync(sortby, sortvalue)
        this.props.onSort(this.state.sort);

    }
    // callback = (sortby, sortvalue) => {
    //     this.setState({
    //         sort: {
    //             sortby: sortby,
    //             sortvalue: sortvalue
    //         }
    //     })

    // }
    // onClick = async (sortby, sortvalue, callback) => {
    //     await callback(sortby, sortvalue)
    //     console.log(this.state.sort)
    // }
    render() {
        var url = "#"
        return (
            <div className="col-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                    // aria-haspopup="true"
                    // aria-expanded="true">
                    >
                        Sắp xếp
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a className="dropdown-item" href={url}>
                                <span className="fas fa-sort-alpha-down">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a className="dropdown-item" href={url}>
                                <span className="fas fa-sort-alpha-up">
                                    Tên Z-A
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <a className="dropdown-item" href={url}>
                                Trạng Thái Kích Hoạt
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}>
                            <a className="dropdown-item" href={url}>
                                Trạng Thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
