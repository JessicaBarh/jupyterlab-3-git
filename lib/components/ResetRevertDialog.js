import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { classes } from 'typestyle';
import { actionsWrapperClass, buttonClass, cancelButtonClass, closeButtonClass, commitDescriptionClass, commitFormClass, commitSummaryClass, contentWrapperClass, resetRevertDialogClass, submitButtonClass, titleClass, titleWrapperClass } from '../style/ResetRevertDialog';
import { Level } from '../tokens';
/**
 * React component for rendering a dialog for resetting or reverting a single commit.
 */
export class ResetRevertDialog extends React.Component {
    /**
     * Returns a React component for resetting or reverting a single commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
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
         * Callback invoked upon clicking on a dialog.
         *
         * @param event - event object
         */
        this._onClick = (event) => {
            event.stopPropagation();
        };
        /**
         * Callback invoked upon closing the dialog.
         *
         * @param event - event object
         */
        this._onClose = (event) => {
            event.stopPropagation();
            this.props.onClose();
            this._reset();
        };
        /**
         * Callback invoked upon clicking a button to reset or revert a commit.
         *
         * @param event - event object
         */
        this._onSubmit = async () => {
            this.setState({
                disabled: true
            });
            if (this.props.action === 'reset') {
                this._resetCommit(this.props.commit.commit);
            }
            else {
                this._revertCommit(this.props.commit.commit);
            }
            this._reset();
            this.props.onClose();
        };
        this.state = {
            summary: '',
            description: '',
            disabled: false
        };
    }
    /**
     * Renders a dialog.
     *
     * @returns React element
     */
    render() {
        const shortCommit = this.props.commit.commit.slice(0, 7);
        const isRevert = this.props.action === 'revert';
        return (React.createElement(Dialog, { classes: {
                paper: resetRevertDialogClass
            }, open: this.props.open, onClick: this._onClick, onClose: this._onClose },
            React.createElement("div", { className: titleWrapperClass },
                React.createElement("p", { className: titleClass }, isRevert ? 'Revert Changes' : 'Reset Changes'),
                React.createElement("button", { className: closeButtonClass },
                    React.createElement(ClearIcon, { titleAccess: "Close this dialog", fontSize: "small", onClick: this._onClose }))),
            React.createElement("div", { className: contentWrapperClass },
                React.createElement("p", null, isRevert
                    ? "These changes will be reverted. Only commit if you're sure you're okay losing these changes."
                    : `All changes after commit ${shortCommit} will be gone forever (hard reset). Are you sure?`),
                isRevert ? (React.createElement("div", { className: commitFormClass },
                    React.createElement("input", { className: commitSummaryClass, type: "text", placeholder: this._defaultSummary(), title: "Enter a commit message summary (a single line, preferably less than 50 characters)", value: this.state.summary, onChange: this._onSummaryChange }),
                    React.createElement(TextareaAutosize, { className: commitDescriptionClass, minRows: 5, placeholder: this._defaultDescription(), title: "Enter a commit message description", value: this.state.description, onChange: this._onDescriptionChange }))) : null),
            React.createElement(DialogActions, { className: actionsWrapperClass },
                React.createElement("input", { disabled: this.state.disabled, className: classes(buttonClass, cancelButtonClass), type: "button", title: "Cancel changes", value: "Cancel", onClick: this._onClose }),
                React.createElement("input", { disabled: this.state.disabled, className: classes(buttonClass, submitButtonClass), type: "button", title: "Submit changes", value: "Submit", onClick: this._onSubmit }))));
    }
    /**
     * Reset the current branch on the provided commit
     *
     * @param hash Git commit hash
     */
    async _resetCommit(hash) {
        this.props.logger.log({
            level: Level.RUNNING,
            message: 'Discarding changes...'
        });
        try {
            await this.props.model.resetToCommit(hash);
            this.props.logger.log({
                level: Level.SUCCESS,
                message: 'Successfully discarded changes.'
            });
        }
        catch (error) {
            this.props.logger.log({
                level: Level.ERROR,
                message: 'Failed to discard changes.',
                error: new Error(`Failed to discard changes after ${hash.slice(0, 7)}: ${error}`)
            });
        }
    }
    /**
     * Revert the provided commit.
     *
     * @param hash Git commit hash
     */
    async _revertCommit(hash) {
        this.props.logger.log({
            level: Level.RUNNING,
            message: 'Reverting changes...'
        });
        try {
            await this.props.model.revertCommit(this._commitMessage(), hash);
            this.props.logger.log({
                level: Level.SUCCESS,
                message: 'Successfully reverted changes.'
            });
        }
        catch (error) {
            this.props.logger.log({
                level: Level.ERROR,
                message: 'Failed to revert changes.',
                error: new Error(`Failed to revert ${hash.slice(0, 7)}: ${error}`)
            });
        }
    }
    /**
     * Returns a default commit summary for reverting a commit.
     *
     * @returns default commit summary
     */
    _defaultSummary() {
        const summary = this.props.commit.commit_msg.split('\n')[0];
        return `Revert "${summary}"`;
    }
    /**
     * Returns a default commit description for reverting a commit.
     *
     * @returns default commit description
     */
    _defaultDescription() {
        return `This reverts commit ${this.props.commit.commit}`;
    }
    /**
     * Returns a commit message for reverting a commit.
     *
     * @returns commit message
     */
    _commitMessage() {
        const summary = this.state.summary || this._defaultSummary();
        const desc = this.state.description || this._defaultDescription();
        return summary + '\n\n' + desc + '\n';
    }
    /**
     * Resets component state.
     */
    _reset() {
        this.setState({
            summary: '',
            description: '',
            disabled: false
        });
    }
}
//# sourceMappingURL=ResetRevertDialog.js.map