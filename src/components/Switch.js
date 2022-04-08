import React from 'react';
import { Switch } from 'react-native'

export default class SwitchComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			switchValue: props.value
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value != this.props.value) {
			this.setState({ switchValue: nextProps.value })
		}
	}

	changeSwitchValue(value) {
		this.setState({ switchValue: value }, () => {
			this.props.changeMapStatus();
		})
	}

	render() {
		return (
			<Switch
				style={[
					{
						borderColor: '#DADBDF',
						borderWidth: 1,
						borderRadius: 15,
						padding: 5,
					},
					{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
				]}
				value={this.state.switchValue}
				thumbColor={this.state.switchValue ? '#2F80ED' : '#ddd'}
				onValueChange={(value) => {
					this.changeSwitchValue(value)
				}}
			/>
		)
	}
}