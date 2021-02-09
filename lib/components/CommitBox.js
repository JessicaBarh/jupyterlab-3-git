import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { commitFormClass, commitSummaryClass, commitDescriptionClass, commitButtonClass } from '../style/CommitBox';
/**
 * React component for entering a commit message.
 */
export class CommitBox extends React.Component {
    /**
     * Returns a React component for entering a commit message.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking a commit message submit button.
         *
         * @param event - event object
         */
        this._onCommitClick = () => {
            const msg = this.state.summary + '\n\n' + this.state.description + '\n';
            this.props.onCommit(msg);
            // NOTE: we assume here that committing changes always works and we can safely clear component state
            this._reset();
        };
        /**
         * Callback invoked upon updating a commit message description.
         *
         * @param event - event object
         */
        this._onDescriptionChange = (event) => {
            this.setState({
                description: event.target.value
            });
        };
        /**
         * Callback invoked upon updating a commit message summary.
         *
         * @param event - event object
         */
        this._onSummaryChange = (event) => {
            this.setState({
                summary: event.target.value
            });
        };
        this.state = {
            summary: '',
            description: ''
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        const disabled = !(this.props.hasFiles && this.state.summary);
        const title = !this.props.hasFiles
            ? 'Disabled: No files are staged for commit'
            : !this.state.summary
                ? 'Disabled: No commit message summary'
                : 'Commit';
        return (React.createElement("form", { className: commitFormClass },
            React.createElement("input", { className: commitSummaryClass, type: "text", placeholder: "Summary (required)", title: "Enter a commit message summary (a single line, preferably less than 50 characters)", value: this.state.summary, onChange: this._onSummaryChange, onKeyPress: this._onSummaryKeyPress }),
            React.createElement(TextareaAutosize, { className: commitDescriptionClass, minRows: 5, placeholder: "Description", title: "Enter a commit message description", value: this.state.description, onChange: this._onDescriptionChange }),
            React.createElement("input", { className: commitButtonClass, type: "button", title: title, value: "Commit", disabled: disabled, onClick: this._onCommitClick })));
    }
    /**
     * Callback invoked upon a `'keypress'` event when entering a commit message summary.
     *
     * ## Notes
     *
     * -   Prevents triggering a `'submit'` action when hitting the `ENTER` key while entering a commit message summary.
     *
     * @param event - event object
     */
    _onSummaryKeyPress(event) {
        if (event.which === 13) {
            event.preventDefault();
        }
    }
    /**
     * Resets component state (e.g., in order to re-initialize the commit message input box).
     */
    _reset() {
        this.setState({
            summary: '',
            description: ''
        });
    }
}
//# sourceMappingURL=CommitBox.js.map