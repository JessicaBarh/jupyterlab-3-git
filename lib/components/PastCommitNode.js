import { caretDownIcon, caretUpIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { classes } from 'typestyle';
import { branchClass, branchWrapperClass, commitBodyClass, commitExpandedClass, commitHeaderClass, commitHeaderItemClass, commitWrapperClass, iconButtonClass, localBranchClass, remoteBranchClass, workingBranchClass } from '../style/PastCommitNode';
import { SinglePastCommitInfo } from './SinglePastCommitInfo';
/**
 * React component for rendering an individual commit.
 */
export class PastCommitNode extends React.Component {
    /**
     * Returns a React component for rendering an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on an individual commit.
         *
         * @param event - event object
         */
        this._onCommitClick = () => {
            this.setState({
                expanded: !this.state.expanded
            });
        };
        this.state = {
            expanded: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("li", { className: classes(commitWrapperClass, this.state.expanded ? commitExpandedClass : null), onClick: this._onCommitClick },
            React.createElement("div", { className: commitHeaderClass },
                React.createElement("span", { className: commitHeaderItemClass }, this.props.commit.author),
                React.createElement("span", { className: commitHeaderItemClass }, this.props.commit.commit.slice(0, 7)),
                React.createElement("span", { className: commitHeaderItemClass }, this.props.commit.date),
                this.state.expanded ? (React.createElement(caretUpIcon.react, { className: iconButtonClass, tag: "span" })) : (React.createElement(caretDownIcon.react, { className: iconButtonClass, tag: "span" }))),
            React.createElement("div", { className: branchWrapperClass }, this._renderBranches()),
            React.createElement("div", { className: commitBodyClass },
                this.props.commit.commit_msg,
                this.state.expanded && (React.createElement(SinglePastCommitInfo, { commit: this.props.commit, model: this.props.model, commands: this.props.commands })))));
    }
    /**
     * Renders branch information.
     *
     * @returns array of React elements
     */
    _renderBranches() {
        const curr = this.props.commit.commit;
        const branches = [];
        for (let i = 0; i < this.props.branches.length; i++) {
            const branch = this.props.branches[i];
            if (branch.top_commit && branch.top_commit === curr) {
                branches.push(branch);
            }
        }
        return branches.map(this._renderBranch, this);
    }
    /**
     * Renders individual branch data.
     *
     * @param branch - branch data
     * @returns React element
     */
    _renderBranch(branch) {
        return (React.createElement(React.Fragment, { key: branch.name },
            branch.is_current_branch && (React.createElement("span", { className: classes(branchClass, workingBranchClass) }, "working")),
            React.createElement("span", { className: classes(branchClass, branch.is_remote_branch ? remoteBranchClass : localBranchClass) }, branch.name)));
    }
}
//# sourceMappingURL=PastCommitNode.js.map