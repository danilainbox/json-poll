class FinishComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return React.createElement(
            'div',
            {className: 'poll'},
            React.createElement(
                'div',
                {className: 'alert alert-success'},
                'The poll is comlete, thank you!'
            )
        )
    }
}