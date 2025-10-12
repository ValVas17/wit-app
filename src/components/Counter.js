import React, {Component} from "react";

class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }

    increment() {
        // this.state.count = this.state.count + 1
        this.setState({
            count: this.state.count + 1
        }, () => {console.log('Callback value', this.state.count)})
        // console.log(this.state.count)
    }

    render() {
        return (
            <div>
                <br/>   
                <br/>
                <br/>
                You have clicked {this.state.count} times!

                <button onClick={() => this.increment()}>Click!</button>
            {/* <button onClick={() => this.changeMessageBack()}>Change back</button> */}
            </div>

        ) 
    }
}

export default Counter