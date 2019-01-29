import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        }
    }

    onTextChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return(
            <input
                id={this.props.id} 
                type={this.props.type}
                value={this.state.value}
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={this.onTextChange}
                required={(this.props.required ? true : false)}
            />
        );
    }
    
}

export default Input;