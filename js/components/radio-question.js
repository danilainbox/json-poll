class RadioQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.variants[0].value,
            chosenVariant: props.variants[0],
            next: this.defineNextQuestionId(props.variants[0])
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedOption: nextProps.variants[0].value,
            chosenVariant: nextProps.variants[0],
            next: this.defineNextQuestionId(nextProps.variants[0], nextProps)
        });
    }

    handleOptionChange(e) {
        let chosenVariant = this.props.variants.filter(function(item) {
            return item.value == e.target.value;
        })[0];

        this.setState({
            selectedOption: e.target.value,
            chosenVariant: chosenVariant,
            next: this.defineNextQuestionId(chosenVariant)
        });
    }

    defineNextQuestionId(chosenVariant, props = this.props) {
        return (props.type == 'router') ? chosenVariant.next : props.next;
    }

    render() {
        let self = this,
            next = this.state.next ? ` (${this.state.next})` : '';



        return React.createElement(
            'div',
            {
                className: 'question',
                key: self.props.id
            },
            React.createElement(
                'form',
                {onSubmit: function(event) {
                    event.preventDefault();
                    self.props.handleNextClick(self.state.chosenVariant.value, self.state.next);
                }},
                React.createElement(
                    'h1',
                    {className: 'question__header'},
                    self.props.title
                ),
                self.props.variants.map(function(item, index){
                    return React.createElement(
                        'div',
                        {className: 'question__variant radio'},
                        React.createElement(
                            'label',
                            null,
                            React.createElement(
                                'input',
                                {
                                    type: 'radio',
                                    value: item.value,
                                    name: `question${self.props.id}`,
                                    checked: self.state.selectedOption === item.value,
                                    onChange: self.handleOptionChange
                                },
                                null
                            ),
                            item.title
                        )
                    )
                }),
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