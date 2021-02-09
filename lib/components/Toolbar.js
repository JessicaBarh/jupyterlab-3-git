import { PathExt } from '@jupyterlab/coreutils';
import { caretDownIcon, caretUpIcon, refreshIcon } from '@jupyterlab/ui-components';
import { Badge, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { classes } from 'typestyle';
import { CommandIDs } from '../commandsAndMenu';
import { selectedTabClass, tabClass, tabIndicatorClass, tabsClass } from '../style/GitPanel';
import { branchIcon, desktopIcon, pullIcon, pushIcon } from '../style/icons';
import { badgeClass, spacer, toolbarButtonClass, toolbarClass, toolbarMenuButtonClass, toolbarMenuButtonEnabledClass, toolbarMenuButtonIconClass, toolbarMenuButtonSubtitleClass, toolbarMenuButtonTitleClass, toolbarMenuButtonTitleWrapperClass, toolbarMenuWrapperClass, toolbarNavClass } from '../style/Toolbar';
import { Level } from '../tokens';
import { ActionButton } from './ActionButton';
import { BranchMenu } from './BranchMenu';
import { TagMenu } from './TagMenu';
/**
 * React component for rendering a panel toolbar.
 */
export class Toolbar extends React.Component {
    /**
     * Returns a React component for rendering a panel toolbar.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking a button to pull the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pulling the latest changes
         */
        this._onPullClick = async () => {
            await this.props.commands.execute(CommandIDs.gitPull);
        };
        /**
         * Callback invoked upon clicking a button to push the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pushing the latest changes
         */
        this._onPushClick = async () => {
            await this.props.commands.execute(CommandIDs.gitPush);
        };
        /**
         * Callback invoked upon clicking a button to change the current branch.
         *
         * @param event - event object
         */
        this._onBranchClick = () => {
            // Toggle the branch menu:
            this.setState({
                branchMenu: !this.state.branchMenu
            });
        };
        /**
         * Callback invoked upon clicking a button to refresh the model.
         *
         * @param event - event object
         * @returns a promise which resolves upon refreshing the model
         */
        this._onRefreshClick = async () => {
            this.props.logger.log({
                level: Level.RUNNING,
                message: 'Refreshing...'
            });
            try {
                await this.props.model.refresh();
                this.props.logger.log({
                    level: Level.SUCCESS,
                    message: 'Successfully refreshed.'
                });
            }
            catch (error) {
                console.error(error);
                this.props.logger.log({
                    level: Level.ERROR,
                    message: 'Failed to refresh.',
                    error
                });
            }
        };
        this.state = {
            branchMenu: false,
            tab: 0
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("div", { className: toolbarClass },
            this._renderTopNav(),
            this._renderRepoMenu(),
            this._renderBranchMenu()));
    }
    /**
     * Renders the top navigation.
     *
     * @returns React element
     */
    _renderTopNav() {
        var _a;
        const activeBranch = this.props.branches.filter(branch => branch.is_current_branch);
        // FIXME whether the repository as a remote or not should be done through a call to `git remote`
        const hasRemote = this.props.branches.some(branch => branch.is_remote_branch);
        const hasUpstream = ((_a = activeBranch[0]) === null || _a === void 0 ? void 0 : _a.upstream) !== null;
        return (React.createElement("div", { className: toolbarNavClass },
            React.createElement("span", { className: spacer }),
            React.createElement(Badge, { className: badgeClass, variant: "dot", invisible: !hasRemote || this.props.nCommitsBehind === 0, "data-test-id": "pull-badge" },
                React.createElement(ActionButton, { className: toolbarButtonClass, disabled: !hasRemote, icon: pullIcon, onClick: hasRemote ? this._onPullClick : undefined, title: hasRemote
                        ? 'Pull latest changes' +
                            (this.props.nCommitsBehind > 0
                                ? ` (behind by ${this.props.nCommitsBehind} commits)`
                                : '')
                        : 'No remote repository defined' })),
            React.createElement(Badge, { className: badgeClass, variant: "dot", invisible: !hasRemote || (this.props.nCommitsAhead === 0 && hasUpstream), "data-test-id": "push-badge" },
                React.createElement(ActionButton, { className: toolbarButtonClass, disabled: !hasRemote, icon: pushIcon, onClick: hasRemote ? this._onPushClick : undefined, title: hasRemote
                        ? hasUpstream
                            ? 'Push committed changes' +
                                (this.props.nCommitsAhead > 0
                                    ? ` (ahead by ${this.props.nCommitsAhead} commits)`
                                    : '')
                            : 'Publish branch'
                        : 'No remote repository defined' })),
            React.createElement(ActionButton, { className: toolbarButtonClass, icon: refreshIcon, onClick: this._onRefreshClick, title: 'Refresh the repository to detect local and remote changes' })));
    }
    /**
     * Renders a repository menu.
     *
     * @returns React element
     */
    _renderRepoMenu() {
        return (React.createElement("div", { className: toolbarMenuWrapperClass },
            React.createElement("button", { disabled: true, className: toolbarMenuButtonClass, title: `Current repository: ${this.props.repository}` },
                React.createElement(desktopIcon.react, { className: toolbarMenuButtonIconClass }),
                React.createElement("div", { className: toolbarMenuButtonTitleWrapperClass },
                    React.createElement("p", { className: toolbarMenuButtonTitleClass }, "Current Repository"),
                    React.createElement("p", { className: toolbarMenuButtonSubtitleClass }, PathExt.basename(this.props.repository))))));
    }
    /**
     * Renders a branch menu.
     *
     * @returns React element
     */
    _renderBranchMenu() {
        if (!this.props.model.pathRepository) {
            return null;
        }
        return (React.createElement("div", { className: toolbarMenuWrapperClass },
            React.createElement("button", { className: classes(toolbarMenuButtonClass, toolbarMenuButtonEnabledClass), title: 'Manage branches and tags', onClick: this._onBranchClick },
                React.createElement(branchIcon.react, { className: toolbarMenuButtonIconClass }),
                React.createElement("div", { className: toolbarMenuButtonTitleWrapperClass },
                    React.createElement("p", { className: toolbarMenuButtonTitleClass }, "Current Branch"),
                    React.createElement("p", { className: toolbarMenuButtonSubtitleClass }, this.props.currentBranch || '')),
                this.state.branchMenu ? (React.createElement(caretUpIcon.react, { className: toolbarMenuButtonIconClass })) : (React.createElement(caretDownIcon.react, { className: toolbarMenuButtonIconClass }))),
            this.state.branchMenu ? this._renderTabs() : null));
    }
    _renderTabs() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Tabs, { classes: {
                    root: tabsClass,
                    indicator: tabIndicatorClass
                }, value: this.state.tab, onChange: (event, tab) => {
                    this.setState({
                        tab: tab
                    });
                } },
                React.createElement(Tab, { classes: {
                        root: tabClass,
                        selected: selectedTabClass
                    }, title: "View branches", label: "Branches", disableFocusRipple: true, disableRipple: true }),
                React.createElement(Tab, { classes: {
                        root: tabClass,
                        selected: selectedTabClass
                    }, title: "View tags", label: "Tags", disableFocusRipple: true, disableRipple: true })),
            this.state.tab === 0 ? this._renderBranches() : this._renderTags()));
    }
    _renderBranches() {
        return (React.createElement(BranchMenu, { currentBranch: this.props.currentBranch || '', branches: this.props.branches, branching: this.props.branching, logger: this.props.logger, model: this.props.model }));
    }
    _renderTags() {
        return (React.createElement(TagMenu, { logger: this.props.logger, model: this.props.model, branching: this.props.branching }));
    }
}
//# sourceMappingURL=Toolbar.js.map