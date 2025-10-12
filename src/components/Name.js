import React from "react"

        /* <Name name='Данилыч' level='1'>
          <p>Some inbetween</p>
        </Name>
        <Name name='Заиц' level='3'>
          <button>Some   action</button>
        </Name>
        <Name name='Пухоль' level='2'/>*/


// function Name() 
// {
    // return <h1>This is Wit</h1>
// }

export const Name = ({name, level}) => {
    // const {name, level} = props;
    // console.log(props)
    return (
        <div>
            <h1>You are {name} at a level of {level}</h1>
            {/* {props.children} */}
        </div>
    )
}


// export const Name = (props) => {
//     console.log(props)
//     return (
//         <div>
//             <h1>You are {props.name} at a level of {props.level}</h1>
//             {props.children}
//         </div>
//     )
// }
// export default Name