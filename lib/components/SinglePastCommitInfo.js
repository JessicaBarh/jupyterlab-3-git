import { fileIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { classes } from 'typestyle';
import { CommandIDs } from '../commandsAndMenu';
import { LoggerContext } from '../logger';
import { deletionsMadeIcon, diffIcon, discardIcon, insertionsMadeIcon, rewindIcon } from '../style/icons';
import { actionButtonClass, commitClass, commitDetailClass, commitDetailFileClass, commitDetailHeaderClass, commitOverviewNumbersClass, deletionsIconClass, fileListClass, iconClass, insertionsIconClass } from '../style/SinglePastCommitInfo';
import { ActionButton } from './ActionButton';
import { isDiffSupported } from './diff/Diff';
import { FilePath } from './FilePath';
import { ResetRevertDialog } from './ResetRevertDialog';
const ITEM_HEIGHT = 24; // File list item height
const MAX_VISIBLE_FILES = 20; // Maximal number of file display at once
/**
 * React component for rendering information about an individual commit.
 */
export class SinglePastCommitInfo extends React.Component {
    /**
     * Returns a React component for information about an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a modified file.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderFile = (props) => {
            const { data, index, style } = props;
            const file = data[index];
            const path = file.modified_file_path;
            const flg = isDiffSupported(path) || !file.is_binary;
            return (React.createElement("li", { className: commitDetailFileClass, onClick: this._onDiffClickFactory(path, flg), style: style, title: path },
                React.createElement(FilePath, { filepath: path, filetype: file.type }),
                flg ? (React.createElement(ActionButton, { icon: diffIcon, title: "View file changes" })) : null));
        };
        /**
         * Callback invoked upon a clicking a button to revert changes.
         *
         * @param event - event object
         */
        this._onRevertClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'revert'
            });
        };
        /**
         * Callback invoked upon a clicking a button to reset changes.
         *
         * @param event - event object
         */
        this._onResetClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'reset'
            });
        };
        /**
         * Callback invoked upon closing a dialog to reset or revert changes.
         */
        this._onResetRevertDialogClose = () => {
            this.setState({
                resetRevertDialog: false
            });
        };
        this.state = {
            info: '',
            numFiles: '',
            insertions: '',
            deletions: '',
            modifiedFiles: [],
            loadingState: 'loading',
            resetRevertDialog: false,
            resetRevertAction: 'reset'
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    async componentDidMount() {
        try {
            const log = await this.props.model.detailedLog(this.props.commit.commit);
            this.setState({
                info: log.modified_file_note,
                numFiles: log.modified_files_count,
                insertions: log.number_of_insertions,
                deletions: log.number_of_deletions,
                modifiedFiles: log.modified_files,
                loadingState: 'success'
            });
        }
        catch (err) {
            console.error(`Error while getting detailed log for commit ${this.props.commit.commit} and path ${this.props.model.pathRepository}`, err);
            this.setState({ loadingState: 'error' });
            return;
        }
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        if (this.state.loadingState === 'loading') {
            return React.createElement("div", null, "...");
        }
        if (this.state.loadingState === 'error') {
            return React.createElement("div", null, "Error loading commit data");
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: commitClass },
                React.createElement("div", { className: commitOverviewNumbersClass },
                    React.createElement("span", { title: "# Files Changed" },
                        React.createElement(fileIcon.react, { className: iconClass, tag: "span" }),
                        this.state.numFiles),
                    React.createElement("span", { title: "# Insertions" },
                        React.createElement(insertionsMadeIcon.react, { className: classes(iconClass, insertionsIconClass), tag: "span" }),
                        this.state.insertions),
                    React.createElement("span", { title: "# Deletions" },
                        React.createElement(deletionsMadeIcon.react, { className: classes(iconClass, deletionsIconClass), tag: "span" }),
                        this.state.deletions))),
            React.createElement("div", { className: commitDetailClass },
                React.createElement("div", { className: commitDetailHeaderClass },
                    "Changed",
                    React.createElement(ActionButton, { className: actionButtonClass, icon: discardIcon, title: "Revert changes introduced by this commit", onClick: this._onRevertClick }),
                    React.createElement(ActionButton, { className: actionButtonClass, icon: rewindIcon, title: "Discard changes introduced *after* this commit (hard reset)", onClick: this._onResetClick }),
                    React.createElement(LoggerContext.Consumer, null, logger => (React.createElement(ResetRevertDialog, { open: this.state.resetRevertDialog, action: this.state.resetRevertAction, model: this.props.model, logger: logger, commit: this.props.commit, onClose: this._onResetRevertDialogClose })))),
                this.state.modifiedFiles.length > 0 && (React.createElement(FixedSizeList, { className: fileListClass, height: Math.min(MAX_VISIBLE_FILES, this.state.modifiedFiles.length) *
                        ITEM_HEIGHT, innerElementType: "ul", itemCount: this.state.modifiedFiles.length, itemData: this.state.modifiedFiles, itemKey: (index, data) => data[index].modified_file_path, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderFile)))));
    }
    /**
     * Returns a callback to be invoked clicking a button to display a file diff.
     *
     * @param fpath - modified file path
     * @param bool - boolean indicating whether a displaying a diff is supported for this file path
     * @returns callback
     */
    _onDiffClickFactory(fpath, bool) {
        const self = this;
        if (bool) {
            return onShowDiff;
        }
        return onClick;
        /**
         * Callback invoked upon clicking a button to display a file diff.
         *
         * @private
         * @param event - event object
         */
        function onClick(event) {
            // Prevent the commit component from being collapsed:
            event.stopPropagation();
        }
        /**
         * Callback invoked upon clicking a button to display a file diff.
         *
         * @private
         * @param event - event object
         */
        async function onShowDiff(event) {
            // Prevent the commit component from being collapsed:
            event.stopPropagation();
            try {
                self.props.commands.execute(CommandIDs.gitFileDiff, {
                    filePath: fpath,
                    isText: bool,
                    context: {
                        previousRef: {
                            gitRef: self.props.commit.pre_commit
                        },
                        currentRef: {
                            gitRef: self.props.commit.commit
                        }
                    }
                });
            }
            catch (err) {
                console.error(`Failed to open diff view for ${fpath}.\n${err}`);
            }
        }
    }
}
//# sourceMappingURL=SinglePastCommitInfo.js.map