import React, { Component } from 'react'

export default class TaskSearchControl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: '',
        }
    }
    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }
    render() {
        return (
            <div className="col-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        value={this.state.keyword}
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        onChange={this.onHandleChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5"></span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}
