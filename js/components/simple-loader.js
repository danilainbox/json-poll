class SimpleLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            dots: ''
        };

        this.prepareDots = this.prepareDots.bind(this);
    }

    prepareDots() {
        let dots = this.state.dots;
        dots += '.';
        if (dots.length > 3) dots = '';
        this.setState({
            dots: dots
        });
        setTimeout(this.prepareDots, 200);
    }

    componentDidMount() {
        this.prepareDots();
    }

    render() {
        return React.createElement(
            'div',
            {className: 'loader'},
            `${this.state.text} ${this.state.dots}`
        );
    }
}
