import { showDialog } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import { Signal } from '@lumino/signaling';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { CommandIDs } from '../commandsAndMenu';
import { panelWrapperClass, repoButtonClass, selectedTabClass, tabClass, tabIndicatorClass, tabsClass, warningTextClass } from '../style/GitPanel';
import { Git, Level } from '../tokens';
import { GitAuthorForm } from '../widgets/AuthorBox';
import { CommitBox } from './CommitBox';
import { FileList } from './FileList';
import { HistorySideBar } from './HistorySideBar';
import { Toolbar } from './Toolbar';
/**
 * React component for rendering a panel for performing Git operations.
 */
export class GitPanel extends React.Component {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        this.refreshBranch = async () => {
            const { currentBranch } = this.props.model;
            this.setState({
                branches: this.props.model.branches,
                currentBranch: currentBranch ? currentBranch.name : 'master'
            });
        };
        this.refreshHistory = async () => {
            if (this.props.model.pathRepository !== null) {
                // Get git log for current branch
                const logData = await this.props.model.log(this.props.settings.composite['historyCount']);
                let pastCommits = new Array();
                if (logData.code === 0) {
                    pastCommits = logData.commits;
                }
                this.setState({
                    pastCommits: pastCommits
                });
            }
        };
        /**
         * Refresh widget, update all content
         */
        this.refreshView = async () => {
            if (this.props.model.pathRepository !== null) {
                await this.refreshBranch();
                await this.refreshHistory();
            }
        };
        /**
         * Commits all marked files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this.commitMarkedFiles = async (message) => {
            this.props.logger.log({
                level: Level.RUNNING,
                message: 'Staging files...'
            });
            await this.props.model.reset();
            await this.props.model.add(...this._markedFiles.map(file => file.to));
            await this.commitStagedFiles(message);
        };
        /**
         * Commits all staged files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this.commitStagedFiles = async (message) => {
            if (!message) {
                return;
            }
            const errorLog = {
                level: Level.ERROR,
                message: 'Failed to commit changes.'
            };
            try {
                const res = await this._hasIdentity(this.props.model.pathRepository);
                if (!res) {
                    this.props.logger.log(errorLog);
                    return;
                }
                this.props.logger.log({
                    level: Level.RUNNING,
                    message: 'Committing changes...'
                });
                await this.props.model.commit(message);
                this.props.logger.log({
                    level: Level.SUCCESS,
                    message: 'Committed changes.'
                });
            }
            catch (error) {
                console.error(error);
                this.props.logger.log(Object.assign(Object.assign({}, errorLog), { error }));
            }
        };
        /**
         * Callback invoked upon changing the active panel tab.
         *
         * @param event - event object
         * @param tab - tab number
         */
        this._onTabChange = (event, tab) => {
            if (tab === 1) {
                this.refreshHistory();
            }
            this.setState({
                tab: tab
            });
        };
        this._previousRepoPath = null;
        this.state = {
            branches: [],
            currentBranch: '',
            files: [],
            nCommitsAhead: 0,
            nCommitsBehind: 0,
            pastCommits: [],
            repository: null,
            tab: 0
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount() {
        const { model, settings } = this.props;
        model.repositoryChanged.connect((_, args) => {
            this.setState({
                repository: args.newValue
            });
            this.refreshView();
        }, this);
        model.statusChanged.connect(() => {
            this.setState({
                files: model.status.files,
                nCommitsAhead: model.status.ahead,
                nCommitsBehind: model.status.behind
            });
        }, this);
        model.headChanged.connect(async () => {
            await this.refreshBranch();
            if (this.state.tab === 1) {
                this.refreshHistory();
            }
        }, this);
        model.markChanged.connect(() => this.forceUpdate(), this);
        settings.changed.connect(this.refreshView, this);
    }
    componentWillUnmount() {
        // Clear all signal connections
        Signal.clearData(this);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("div", { className: panelWrapperClass }, this.state.repository ? (React.createElement(React.Fragment, null,
            this._renderToolbar(),
            this._renderMain())) : (this._renderWarning())));
    }
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    _renderToolbar() {
        const disableBranching = Boolean(this.props.settings.composite['disableBranchWithChanges'] &&
            (this._hasUnStagedFile() || this._hasStagedFile()));
        return (React.createElement(Toolbar, { currentBranch: this.state.currentBranch, branches: this.state.branches, branching: !disableBranching, commands: this.props.commands, logger: this.props.logger, model: this.props.model, nCommitsAhead: this.state.nCommitsAhead, nCommitsBehind: this.state.nCommitsBehind, repository: this.state.repository || '' }));
    }
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    _renderMain() {
        return (React.createElement(React.Fragment, null,
            this._renderTabs(),
            this.state.tab === 1 ? this._renderHistory() : this._renderChanges()));
    }
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    _renderTabs() {
        return (React.createElement(Tabs, { classes: {
                root: tabsClass,
                indicator: tabIndicatorClass
            }, value: this.state.tab, onChange: this._onTabChange },
            React.createElement(Tab, { classes: {
                    root: tabClass,
                    selected: selectedTabClass
                }, title: "View changed files", label: "Changes", disableFocusRipple: true, disableRipple: true }),
            React.createElement(Tab, { classes: {
                    root: tabClass,
                    selected: selectedTabClass
                }, title: "View commit history", label: "History", disableFocusRipple: true, disableRipple: true })));
    }
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    _renderChanges() {
        return (React.createElement(React.Fragment, null,
            React.createElement(FileList, { files: this._sortedFiles, model: this.props.model, commands: this.props.commands, settings: this.props.settings }),
            this.props.settings.composite['simpleStaging'] ? (React.createElement(CommitBox, { hasFiles: this._markedFiles.length > 0, onCommit: this.commitMarkedFiles })) : (React.createElement(CommitBox, { hasFiles: this._hasStagedFile(), onCommit: this.commitStagedFiles }))));
    }
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    _renderHistory() {
        return (React.createElement(HistorySideBar, { branches: this.state.branches, commits: this.state.pastCommits, model: this.props.model, commands: this.props.commands }));
    }
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    _renderWarning() {
        const path = this.props.filebrowser.path;
        const { commands } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: warningTextClass },
                path ? (React.createElement(React.Fragment, null,
                    React.createElement("b", { title: path }, PathExt.basename(path)),
                    " is not")) : ('You are not currently in'),
                ' a Git repository. To use Git, navigate to a local repository, initialize a repository here, or clone an existing repository.'),
            React.createElement("button", { className: repoButtonClass, onClick: () => commands.execute('filebrowser:toggle-main') }, "Open the FileBrowser"),
            React.createElement("button", { className: repoButtonClass, onClick: () => commands.execute(CommandIDs.gitInit) }, "Initialize a Repository"),
            React.createElement("button", { className: repoButtonClass, onClick: async () => {
                    await commands.execute(CommandIDs.gitClone);
                    await commands.execute('filebrowser:toggle-main');
                } }, "Clone a Repository")));
    }
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     * @returns a promise which returns a success status
     */
    async _hasIdentity(path) {
        // If the repository path changes, check the user identity
        if (path !== this._previousRepoPath) {
            try {
                const data = (await this.props.model.config());
                const options = data['options'];
                const keys = Object.keys(options);
                // If the user name or e-mail is unknown, ask the user to set it
                if (keys.indexOf('user.name') < 0 || keys.indexOf('user.email') < 0) {
                    const result = await showDialog({
                        title: 'Who is committing?',
                        body: new GitAuthorForm()
                    });
                    if (!result.button.accept) {
                        console.log('User refuses to set identity.');
                        return false;
                    }
                    const identity = result.value;
                    try {
                        await this.props.model.config({
                            'user.name': identity.name,
                            'user.email': identity.email
                        });
                    }
                    catch (error) {
                        if (error instanceof Git.GitResponseError) {
                            console.log(error);
                            return false;
                        }
                        throw error;
                    }
                }
                this._previousRepoPath = path;
            }
            catch (error) {
                throw new Error('Failed to set your identity. ' + error.message);
            }
        }
        return Promise.resolve(true);
    }
    _hasStagedFile() {
        return this.state.files.some(file => file.status === 'staged' || file.status === 'partially-staged');
    }
    _hasUnStagedFile() {
        return this.state.files.some(file => file.status === 'unstaged' || file.status === 'partially-staged');
    }
    /**
     * List of marked files.
     */
    get _markedFiles() {
        return this._sortedFiles.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * List of sorted modified files.
     */
    get _sortedFiles() {
        const { files } = this.state;
        files.sort((a, b) => a.to.localeCompare(b.to));
        return files;
    }
}
//# sourceMappingURL=GitPanel.js.map