class MainLayout extends React.Component {
    constructor(props) {
        super(props);

        let pollResult;

        pollResult = {
            user: Math.random().toString(36).slice(2),
            date: '',
            answers: []
        };

        this.state = {
            start: true,
            pollResult: pollResult
        };

        this.handleNextClick = this.handleNextClick.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
    }

    selectQuestion(questions = this.state.questions, nextQuestionNumber) {
        let selected, error, result;

        if (this.state.start) {
            selected = questions.filter(function(item) {
                return item.start;
            });

            error = !selected.length ? 'Не найден вопрос c ключом start = true' : undefined;
        } else {
            selected = questions.filter(function(item) {
                return item.id == nextQuestionNumber;
            });

            error = !selected.length ? `Не найден вопрос с ключом start = ${nextQuestionNumber}` : undefined;
        }

        result = {
            currentQuestion: selected[0],
            error: error
        };

        return result;
    }

    handleNextClick(chosenData, next) {

        let newPollResult = {
                user: this.state.pollResult.user,
                date: this.state.pollResult.date,
                answers: [...this.state.pollResult.answers]
            },
            stepAnswer,
            selected;

        stepAnswer = {
            id: this.state.currentQuestion.id,
            value: chosenData
        };

        newPollResult.answers.push(stepAnswer);

        if (this.state.currentQuestion.finish) {

            let date, currentDate;

            currentDate = new Date();

            date = new Date().getFullYear() + "-"
                + ('0'+(currentDate.getMonth()+1)).slice(-2)  + "-"
                + ('0'+currentDate.getDate()).slice(-2) + " "
                + ('0'+currentDate.getHours()).slice(-2) + ":"
                + ('0'+currentDate.getMinutes()).slice(-2) + ":"
                + ('0'+currentDate.getSeconds()).slice(-2);

            newPollResult.date = date;

            this.setState({
                finish: true,
                pollResult: newPollResult
            });

            return;
        }

        selected = this.selectQuestion(this.state.questions, next);

        this.setState(Object.assign({}, {pollResult: newPollResult}, selected));
    }

    componentDidMount() {
        let self = this,
            result;
        $.get("https://api.myjson.com/bins/o5hw3", function(data, textStatus, jqXHR) {
            result = self.selectQuestion(data.questions);
            result.questions = data.questions;
            result.start = false;
            self.setState(result);
        });
    }

    render() {
        let result;

        if (this.state.finish) {

            console.log($.toJSON(this.state.pollResult));

            return React.createElement(
                FinishComponent,
                {},
                null
            )
        }

        if (!this.state.questions) {
            result = React.createElement(
                SimpleLoader,
                {text: 'Data is loading'},
                null
            )
        } else {
            if (this.state.currentQuestion) {
                switch (this.state.currentQuestion.input) {
                    case 'radio':
                    case 'router':
                        result = React.createElement(
                            RadioQuestion,
                            {
                                title: this.state.currentQuestion.title,
                                variants: this.state.currentQuestion.variants,
                                id: this.state.currentQuestion.id,
                                handleNextClick: this.handleNextClick,
                                type: this.state.currentQuestion.input,
                                next: this.state.currentQuestion.next
                            },
                            null
                        );
                        break;
                    case 'string':
                        result = React.createElement(
                            RangeQuestion,
                            {
                                id: this.state.currentQuestion.id,
                                minValue: this.state.currentQuestion.validates.numericality.min,
                                maxValue: this.state.currentQuestion.validates.numericality.max,
                                value: this.state.currentQuestion.validates.numericality.min,
                                title: this.state.currentQuestion.title,
                                handleNextClick: this.handleNextClick,
                                type: this.state.currentQuestion.input,
                                next: this.state.currentQuestion.next
                            },
                            null
                        );
                        break;
                    case 'range':
                        result = React.createElement(
                            RangeQuestion,
                            {
                                id: this.state.currentQuestion.id,
                                minValue: this.state.currentQuestion.min,
                                maxValue: this.state.currentQuestion.max,
                                value: this.state.currentQuestion.value,
                                title: this.state.currentQuestion.title,
                                handleNextClick: this.handleNextClick,
                                type: this.state.currentQuestion.input,
                                next: this.state.currentQuestion.next
                            }
                        );
                        break;
                    case 'checkbox':
                        result = React.createElement(
                            CheckboxQuestion,
                            {
                                id: this.state.currentQuestion.id,
                                title: this.state.currentQuestion.title,
                                variants: this.state.currentQuestion.variants,
                                handleNextClick: this.handleNextClick,
                                type: this.state.currentQuestion.input,
                                next: this.state.currentQuestion.next
                            },
                            null
                        );
                }
            } else {
                result = React.createElement(
                    'span',
                    null,
                    this.state.error
                )
            }
        }

        return React.createElement(
            'div',
            {className: 'poll'},
            result
        );
    };
}

ReactDOM.render(
    React.createElement(MainLayout, {}, null),
    document.getElementById('app')
);











