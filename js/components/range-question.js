class RangeQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            next: props.next
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        let self = this,
            next = this.state.next ? ` (${this.state.next})` : '';

        return React.createElement(
            'div',
            {className: 'question'},
            React.createElement(
                'form',
                {onSubmit: function(event) {
                    event.preventDefault();
                    self.props.handleNextClick(
                        self.state.value,
                        self.state.next
                    );
                }},
                React.createElement(
                    'h1',
                    {className: 'question__header'},
                    self.props.title
                ),
                React.createElement(
                    'input',
                    {
                        type: 'range',
                        min: self.props.minValue,
                        max: self.props.maxValue,
                        value: self.state.value,
                        step: '1',
                        onChange: self.handleChange,
                    }
                ),
                React.createElement(
                    'div',
                    {
                        className: 'question__range-value'
                    },
                    self.state.value
                ),
                React.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'btn btn-primary btn-lg question__btn'
                    },
                    `Next${next}`
                )
            )
        )
    }
}