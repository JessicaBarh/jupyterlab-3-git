import { FileBrowserModel } from '@jupyterlab/filebrowser';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { Logger } from '../logger';
import { GitExtension } from '../model';
import { Git } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface IGitPanelProps {
    /**
     * Jupyter App commands registry
     */
    commands: CommandRegistry;
    /**
     * File browser model.
     */
    filebrowser: FileBrowserModel;
    /**
     * Extension logger
     */
    logger: Logger;
    /**
     * Git extension data model.
     */
    model: GitExtension;
    /**
     * Git extension settings.
     */
    settings: ISettingRegistry.ISettings;
}
/**
 * Interface describing component state.
 */
export interface IGitPanelState {
    /**
     * Git path repository
     */
    repository: string | null;
    /**
     * List of branches.
     */
    branches: Git.IBranch[];
    /**
     * Current branch.
     */
    currentBranch: string;
    /**
     * List of changed files.
     */
    files: Git.IStatusFile[];
    /**
     * Number of commits ahead
     */
    nCommitsAhead: number;
    /**
     * Number of commits behind
     */
    nCommitsBehind: number;
    /**
     * List of prior commits.
     */
    pastCommits: Git.ISingleCommitInfo[];
    /**
     * Panel tab identifier.
     */
    tab: number;
}
/**
 * React component for rendering a panel for performing Git operations.
 */
export declare class GitPanel extends React.Component<IGitPanelProps, IGitPanelState> {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: IGitPanelProps);
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    refreshBranch: () => Promise<void>;
    refreshHistory: () => Promise<void>;
    /**
     * Refresh widget, update all content
     */
    refreshView: () => Promise<void>;
    /**
     * Commits all marked files.
     *
     * @param message - commit message
     * @returns a promise which commits the files
     */
    commitMarkedFiles: (message: string) => Promise<void>;
    /**
     * Commits all staged files.
     *
     * @param message - commit message
     * @returns a promise which commits the files
     */
    commitStagedFiles: (message: string) => Promise<void>;
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    private _renderToolbar;
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    private _renderMain;
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    private _renderTabs;
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    private _renderChanges;
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    private _renderHistory;
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    private _renderWarning;
    /**
     * Callback invoked upon changing the active panel tab.
     *
     * @param event - event object
     * @param tab - tab number
     */
    private _onTabChange;
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     * @returns a promise which returns a success status
     */
    private _hasIdentity;
    private _hasStagedFile;
    private _hasUnStagedFile;
    /**
     * List of marked files.
     */
    private get _markedFiles();
    /**
     * List of sorted modified files.
     */
    private get _sortedFiles();
    private _previousRepoPath;
}
