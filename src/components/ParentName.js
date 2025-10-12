import React, {Component} from "react";
import { ChildComponent } from "./ChildComponent";

class ParentName extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            parentName: 'Parent'
        }

        this.greetParent = this.greetParent.bind(this)
    }

    greetParent (props) {
        // alert('Hello, ' + this.state.parentName)
        alert(`Hello, ${this.state.parentName} from ${props}`)
    }

    render () {
        return (
            <div>
                <ChildComponent greetHandler={this.greetParent}/>
            </div>
        )
    }
}

export default ParentName