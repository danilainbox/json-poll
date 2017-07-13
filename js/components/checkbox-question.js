class CheckboxQuestion extends React.Component {
    constructor(props) {
        super(props);

        let isChecked = [],
            chosenVariants;

        props.variants.map(function(item, index){
            let elem = {};
            elem.index = index;
            elem.checked = false;

            isChecked.push(elem);
        });

        chosenVariants = props.variants.filter(function(item, index){
            return isChecked[index].checked;
        });

        this.state = {
            isChecked: isChecked,
            chosenVariants: chosenVariants,
            next: props.next
        };
    }

    handleOptionChange(index) {
        let isChecked = this.state.isChecked,
            chosenVariants;

        isChecked[index].checked = !isChecked[index].checked;

        chosenVariants = this.props.variants.filter(function(item, index){
            return isChecked[index].checked;
        });

        this.setState({
            isChecked: isChecked,
            chosenVariants: chosenVariants
        });
    }

    getStepAnswers() {
        let stepAnswers = [];

        this.state.chosenVariants.map(function(item, index) {
            stepAnswers.push(item.value);
        });

        return stepAnswers;
    }

    render() {
        let self = this,
            next = this.state.next ? ` (${this.state.next})` : '',
            stepAnswers = this.getStepAnswers();

        return React.createElement(
            'div',
            {className: 'question'},
            React.createElement(
                'form',
                {onSubmit: function(event) {
                    event.preventDefault();
                    self.props.handleNextClick(stepAnswers, self.state.next);
                }},
                React.createElement(
                    'h1',
                    {className: 'question__header'},
                    self.props.title
                ),
                self.props.variants.map(function(item, index) {
                    return React.createElement(
                        'div',
                        {className: 'question__variant checkbox'},
                        React.createElement(
                            'label',
                            null,
                            React.createElement(
                                'input',
                                {
                                    type: 'checkbox',
                                    value: item.value,
                                    name: `question${self.props.id}`,
                                    checked: self.state.isChecked[index].checked,
                                    onChange: function() {
                                        self.handleOptionChange(index)
                                    }
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
        );
    }
}
