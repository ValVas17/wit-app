import React, {Component} from "react";


        // <Name1 name='Данилыч' level='5'/>
        // <Name1 name='Заиц' level='7'/>
        // <Name1 name='Пухоль' level='6'/> 

class Name1 extends Component {
    render() {
        const {name, level} = this.props

        return <h1>Class Component {this.props.name} at the level of {this.props.level}</h1>
    }
}

export default Name1