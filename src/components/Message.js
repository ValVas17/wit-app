import React, {Component} from "react";

class Message extends Component {
    constructor() {
        super()
        this.state = {
            message: ', dude'
        }
    }

    changeMessage() {
        this.setState({
            message: ', dumbass'
        })
    }


    changeMessageBack() {
        this.setState({
            message: ', dude'
        })
    }

    render() {
        return (
            <div>
            <h1>
                Welome{this.state.message}
            </h1>

            <button onClick={() => this.changeMessage()}>Change</button>
            <button onClick={() => this.changeMessageBack()}>Change back</button>
            </div>

        ) 
    }
}

export default Message