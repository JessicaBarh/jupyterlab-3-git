import { Dialog, showDialog, showErrorMessage } from '@jupyterlab/apputils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { classes } from 'typestyle';
import { hiddenButtonStyle } from '../style/ActionButtonStyle';
import { activeListItemClass, nameClass, filterClass, filterClearClass, filterInputClass, filterWrapperClass, listItemClass, listItemIconClass, newBranchButtonClass, wrapperClass } from '../style/BranchMenu';
import { branchIcon, trashIcon } from '../style/icons';
import { Level } from '../tokens';
import { ActionButton } from './ActionButton';
import { NewBranchDialog } from './NewBranchDialog';
const CHANGES_ERR_MSG = 'The current branch contains files with uncommitted changes. Please commit or discard these changes before switching to or creating another branch.';
const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the branches list
const MAX_HEIGHT = 400; // Maximal HTML element height for the branches list
/**
 * Callback invoked upon encountering an error when switching branches.
 *
 * @private
 * @param error - error
 * @param logger - the logger
 */
function onBranchError(error, logger) {
    if (error.message.includes('following files would be overwritten')) {
        // Empty log message to hide the executing alert
        logger.log({
            message: '',
            level: Level.INFO
        });
        showDialog({
            title: 'Unable to switch branch',
            body: (React.createElement(React.Fragment, null,
                React.createElement("p", null, "Your changes to the following files would be overwritten by switching:"),
                React.createElement(List, null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                React.createElement("span", null, "Please commit, stash, or discard your changes before you switch branches."))),
            buttons: [Dialog.okButton({ label: 'Dismiss' })]
        });
    }
    else {
        logger.log({
            level: Level.ERROR,
            message: 'Failed to switch branch.',
            error
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return React.createElement(ListItem, { key: filename }, filename);
}
/**
 * React component for rendering a branch menu.
 */
export class BranchMenu extends React.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const branch = data[index];
            const isActive = branch.name === this.props.currentBranch;
            return (React.createElement(ListItem, { button: true, title: `Switch to branch: ${branch.name}`, className: classes(listItemClass, isActive ? activeListItemClass : null), onClick: this._onBranchClickFactory(branch.name), style: style },
                React.createElement(branchIcon.react, { className: listItemIconClass, tag: "span" }),
                React.createElement("span", { className: nameClass }, branch.name),
                !branch.is_remote_branch && !isActive && (React.createElement(ActionButton, { className: hiddenButtonStyle, icon: trashIcon, title: 'Delete this branch locally', onClick: (event) => {
                        event.stopPropagation();
                        this._onDeleteBranch(branch.name);
                    } }))));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback on delete branch name button
         *
         * @param branchName Branch name
         */
        this._onDeleteBranch = async (branchName) => {
            const acknowledgement = await showDialog({
                title: 'Delete branch',
                body: (React.createElement("p", null,
                    "Are you sure you want to permanently delete the branch",
                    ' ',
                    React.createElement("b", null, branchName),
                    "?",
                    React.createElement("br", null),
                    "This action cannot be undone.")),
                buttons: [Dialog.cancelButton(), Dialog.warnButton({ label: 'Delete' })]
            });
            if (acknowledgement.button.accept) {
                try {
                    await this.props.model.deleteBranch(branchName);
                    await this.props.model.refreshBranch();
                }
                catch (error) {
                    console.error(`Failed to delete branch ${branchName}`, error);
                }
            }
        };
        /**
         * Callback invoked upon clicking a button to create a new branch.
         *
         * @param event - event object
         */
        this._onNewBranchClick = () => {
            if (!this.props.branching) {
                showErrorMessage('Creating a new branch is disabled', CHANGES_ERR_MSG);
                return;
            }
            this.setState({
                branchDialog: true
            });
        };
        /**
         * Callback invoked upon closing a dialog to create a new branch.
         */
        this._onNewBranchDialogClose = () => {
            this.setState({
                branchDialog: false
            });
        };
        this.state = {
            filter: '',
            branchDialog: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("div", { className: wrapperClass },
            this._renderFilter(),
            this._renderBranchList(),
            this._renderNewBranchDialog()));
    }
    /**
     * Renders a branch input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (React.createElement("div", { className: filterWrapperClass },
            React.createElement("div", { className: filterClass },
                React.createElement("input", { className: filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: "Filter", title: "Filter branch menu" }),
                this.state.filter ? (React.createElement("button", { className: filterClearClass },
                    React.createElement(ClearIcon, { titleAccess: "Clear the current filter", fontSize: "small", onClick: this._resetFilter }))) : null),
            React.createElement("input", { className: newBranchButtonClass, type: "button", title: "Create a new branch", value: "New Branch", onClick: this._onNewBranchClick })));
    }
    /**
     * Renders a
     *
     * @returns React element
     */
    _renderBranchList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const branches = this.props.branches.filter(branch => !filter || branch.name.includes(filter));
        return (React.createElement(FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, branches.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    _renderNewBranchDialog() {
        return (React.createElement(NewBranchDialog, { currentBranch: this.props.currentBranch, branches: this.props.branches, logger: this.props.logger, open: this.state.branchDialog, model: this.props.model, onClose: this._onNewBranchDialogClose }));
    }
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    _onBranchClickFactory(branch) {
        const self = this;
        return onClick;
        /**
         * Callback invoked upon clicking a branch name.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch branches
         */
        async function onClick() {
            if (!self.props.branching) {
                showErrorMessage('Switching branches is disabled', CHANGES_ERR_MSG);
                return;
            }
            const opts = {
                branchname: branch
            };
            self.props.logger.log({
                level: Level.RUNNING,
                message: 'Switching branch...'
            });
            try {
                await self.props.model.checkout(opts);
            }
            catch (err) {
                return onBranchError(err, self.props.logger);
            }
            self.props.logger.log({
                level: Level.SUCCESS,
                message: 'Switched branch.'
            });
        }
    }
}
//# sourceMappingURL=BranchMenu.js.map