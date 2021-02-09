import { IChangedArgs } from '@jupyterlab/coreutils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { JSONObject } from '@lumino/coreutils';
import { ISignal } from '@lumino/signaling';
import { Git, IGitExtension } from './tokens';
/**
 * Class for creating a model for retrieving info from, and interacting with, a remote Git repository.
 */
export declare class GitExtension implements IGitExtension {
    /**
     * Returns an extension model.
     *
     * @param app - frontend application
     * @param settings - plugin settings
     * @returns extension model
     */
    constructor(serverRoot: string, docmanager?: IDocumentManager, docRegistry?: DocumentRegistry, settings?: ISettingRegistry.ISettings);
    /**
     * Branch list for the current repository.
     */
    get branches(): Git.IBranch[];
    /**
     * The current repository branch.
     */
    get currentBranch(): Git.IBranch;
    /**
     * Boolean indicating whether the model has been disposed.
     */
    get isDisposed(): boolean;
    /**
     * Boolean indicating whether the model is ready.
     */
    get isReady(): boolean;
    /**
     * Promise which fulfills when the model is ready.
     */
    get ready(): Promise<void>;
    /**
     * Git repository path.
     *
     * ## Notes
     *
     * -   This is the full path of the top-level folder.
     * -   The return value is `null` if a repository path is not defined.
     */
    get pathRepository(): string | null;
    set pathRepository(v: string | null);
    /**
     * Custom model refresh standby condition
     */
    get refreshStandbyCondition(): () => boolean;
    set refreshStandbyCondition(v: () => boolean);
    /**
     * Git repository status
     */
    get status(): Git.IStatus;
    /**
     * A signal emitted when the `HEAD` of the Git repository changes.
     */
    get headChanged(): ISignal<IGitExtension, void>;
    /**
     * A signal emitted when the current marking of the Git repository changes.
     */
    get markChanged(): ISignal<IGitExtension, void>;
    /**
     * A signal emitted when the current Git repository changes.
     */
    get repositoryChanged(): ISignal<IGitExtension, IChangedArgs<string | null>>;
    /**
     * A signal emitted when the current status of the Git repository changes.
     */
    get statusChanged(): ISignal<IGitExtension, Git.IStatus>;
    /**
     * A signal emitted whenever a model event occurs.
     */
    get taskChanged(): ISignal<IGitExtension, string>;
    /**
     * Get the current markers
     *
     * Note: This makes sure it always returns non null value
     */
    protected get _currentMarker(): BranchMarker;
    /**
     * Add one or more files to the repository staging area.
     *
     * ## Notes
     *
     * -   If no filename is provided, all files are added.
     *
     * @param filename - files to add
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    add(...filename: string[]): Promise<void>;
    /**
     * Add all "unstaged" files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    addAllUnstaged(): Promise<void>;
    /**
     * Add all untracked files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    addAllUntracked(): Promise<void>;
    /**
     * Add a remote Git repository to the current repository.
     *
     * @param url - remote repository URL
     * @param name - remote name
     * @returns promise which resolves upon adding a remote
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    addRemote(url: string, name?: string): Promise<void>;
    /**
     * Retrieve the repository commit log.
     *
     * ## Notes
     *
     * -  This API can be used to implicitly check if the current folder is a Git repository.
     *
     * @param count - number of commits to retrieve
     * @returns promise which resolves upon retrieving the repository commit log
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    allHistory(count?: number): Promise<Git.IAllHistory>;
    /**
     * Checkout a branch.
     *
     * ## Notes
     *
     * -   If a branch name is provided, checkout the provided branch (with or without creating it)
     * -   If a filename is provided, checkout the file, discarding all changes.
     * -   If nothing is provided, checkout all files, discarding all changes.
     *
     * TODO: Refactor into separate endpoints for each kind of checkout request
     *
     * @param options - checkout options
     * @returns promise which resolves upon performing a checkout
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    checkout(options?: Git.ICheckoutOptions): Promise<Git.ICheckoutResult>;
    /**
     * Clone a repository.
     *
     * @param path - local path into which the repository will be cloned
     * @param url - Git repository URL
     * @param auth - remote repository authentication information
     * @returns promise which resolves upon cloning a repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    clone(path: string, url: string, auth?: Git.IAuth): Promise<Git.IResultWithMessage>;
    /**
     * Commit all staged file changes.
     *
     * @param message - commit message
     * @returns promise which resolves upon committing file changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    commit(message: string): Promise<void>;
    /**
     * Get (or set) Git configuration options.
     *
     * @param options - configuration options to set
     * @returns promise which resolves upon either getting or setting configuration options
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    config(options?: JSONObject): Promise<JSONObject | void>;
    /**
     * Delete a branch
     *
     * @param branchName Branch name
     * @returns promise which resolves when the branch has been deleted.
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    deleteBranch(branchName: string): Promise<void>;
    /**
     * Fetch commit information.
     *
     * @param hash - commit hash
     * @returns promise which resolves upon retrieving commit information
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    detailedLog(hash: string): Promise<Git.ISingleCommitFilePathInfo>;
    /**
     * Dispose of model resources.
     */
    dispose(): void;
    /**
     * Ensure a .gitignore file exists
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    ensureGitignore(): Promise<void>;
    /**
     * Return the path of a file relative to the Jupyter server root.
     *
     * ## Notes
     *
     * -   If no path is provided, returns the Git repository top folder relative path.
     * -   If no Git repository selected, returns `null`
     *
     * @param path - file path relative to the top folder of the Git repository
     * @returns relative path
     */
    getRelativeFilePath(path?: string): string | null;
    /**
     * Add an entry in .gitignore file
     *
     * @param filePath File to ignore
     * @param useExtension Whether to ignore the file or its extension
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    ignore(filePath: string, useExtension: boolean): Promise<void>;
    /**
     * Initialize a new Git repository at a specified path.
     *
     * @param path - path at which initialize a Git repository
     * @returns promise which resolves upon initializing a Git repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    init(path: string): Promise<void>;
    /**
     * Retrieve commit logs.
     *
     * @param count - number of commits
     * @returns promise which resolves upon retrieving commit logs
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    log(count?: number): Promise<Git.ILogResult>;
    /**
     * Fetch changes from a remote repository.
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon fetching changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    pull(auth?: Git.IAuth): Promise<Git.IResultWithMessage>;
    /**
     * Push local changes to a remote repository.
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon pushing changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    push(auth?: Git.IAuth): Promise<Git.IResultWithMessage>;
    /**
     * Refresh the repository.
     *
     * @returns promise which resolves upon refreshing the repository
     */
    refresh(): Promise<void>;
    /**
     * Refresh the list of repository branches.
     *
     * Emit headChanged if the branch or its top commit changes
     *
     * @returns promise which resolves upon refreshing repository branches
     */
    refreshBranch(): Promise<void>;
    /**
     * Refresh the repository status.
     *
     * Emit statusChanged if required.
     *
     * @returns promise which resolves upon refreshing the repository status
     */
    refreshStatus(): Promise<void>;
    /**
     * Move files from the "staged" to the "unstaged" area.
     *
     * ## Notes
     *
     * -  If no filename is provided, moves all files from the "staged" to the "unstaged" area.
     *
     * @param filename - file path to be reset
     * @returns promise which resolves upon moving files
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    reset(filename?: string): Promise<void>;
    /**
     * Reset the repository to a specified commit.
     *
     * ## Notes
     *
     * -   If a commit hash is not provided, resets the repository to `HEAD`.
     *
     * @param hash - commit identifier (hash)
     * @returns promises which resolves upon resetting the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    resetToCommit(hash?: string): Promise<void>;
    /**
     * Retrieve the prefix path of a directory `path` with respect to the root repository directory.
     *
     * @param path - directory path
     * @returns promise which resolves upon retrieving the prefix path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    showPrefix(path: string): Promise<string | null>;
    /**
     * Retrieve the top level repository path.
     *
     * @param path - current path
     * @returns promise which resolves upon retrieving the top level repository path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    showTopLevel(path: string): Promise<string | null>;
    /**
     * Retrieve the list of tags in the repository.
     *
     * @returns promise which resolves upon retrieving the tag list
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    tags(): Promise<Git.ITagResult>;
    /**
     * Checkout the specified tag version
     *
     * @param tag - selected tag version
     * @returns promise which resolves upon checking out the tag version of the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    checkoutTag(tag: string): Promise<Git.ICheckoutResult>;
    /**
     * Add a file to the current marker object.
     *
     * @param fname - filename
     * @param mark - mark to set
     */
    addMark(fname: string, mark: boolean): void;
    /**
     * Return the current mark associated with a specified filename.
     *
     * @param fname - filename
     * @returns mark
     */
    getMark(fname: string): boolean;
    /**
     * Toggle the mark for a file in the current marker object
     *
     * @param fname - filename
     */
    toggleMark(fname: string): void;
    /**
     * Register a new diff provider for specified file types
     *
     * @param filetypes File type list
     * @param callback Callback to use for the provided file types
     */
    registerDiffProvider(filetypes: string[], callback: Git.IDiffCallback): void;
    /**
     * Revert changes made after a specified commit.
     *
     * @param message - commit message
     * @param hash - commit identifier (hash)
     * @returns promise which resolves upon reverting changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    revertCommit(message: string, hash: string): Promise<void>;
    /**
     * Make request for a list of all git branches in the repository
     * Retrieve a list of repository branches.
     *
     * @returns promise which resolves upon fetching repository branches
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    protected _branch(): Promise<Git.IBranchResult>;
    /**
     * Get list of files changed between two commits or two branches.
     *
     * Notes:
     *   It assumes the Git path repository as already been checked.
     *
     * @param base id of base commit or base branch for comparison
     * @param remote id of remote commit or remote branch for comparison
     * @param singleCommit id of a single commit
     *
     * @returns the names of the changed files
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    protected _changedFiles(base?: string, remote?: string, singleCommit?: string): Promise<Git.IChangedFilesResult>;
    /**
     * Clear repository status
     */
    protected _clearStatus(): void;
    /**
     * Get the current Git repository path
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     */
    protected _getPathRespository(): Promise<string>;
    /**
     * Resolve path to filetype
     */
    protected _resolveFileType(path: string): DocumentRegistry.IFileType;
    /**
     * Set the repository status.
     *
     * @param v - repository status
     */
    protected _setStatus(v: Git.IStatus): void;
    /**
     * Fetch poll action.
     */
    private _fetchRemotes;
    /**
     * Callback invoked upon a change to plugin settings.
     *
     * @private
     * @param settings - plugin settings
     */
    private _onSettingsChange;
    /**
     * open new editor or show an existing editor of the
     * .gitignore file. If the editor does not have unsaved changes
     * then ensure the editor's content matches the file on disk
     */
    private _openGitignore;
    /**
     * Refresh model status through a Poll
     */
    private _refreshModel;
    /**
     * Standby test function for the refresh Poll
     *
     * Standby refresh if
     * - webpage is hidden
     * - not in a git repository
     * - standby condition is true
     *
     * @returns The test function
     */
    private _refreshStandby;
    /**
     * if file is open in JupyterLab find the widget and ensure the JupyterLab
     * version matches the version on disk. Do nothing if the file has unsaved changes
     *
     * @param path path to the file to be reverted
     */
    private _revertFile;
    /**
     * Set the marker object for a repository path and branch.
     */
    private _setMarker;
    private _status;
    private _pathRepository;
    private _branches;
    private _currentBranch;
    private _serverRoot;
    private _docmanager;
    private _docRegistry;
    private _diffProviders;
    private _fetchPoll;
    private _isDisposed;
    private _markerCache;
    private __currentMarker;
    private _readyPromise;
    private _pendingReadyPromise;
    private _settings;
    private _standbyCondition;
    private _statusPoll;
    private _taskHandler;
    private _headChanged;
    private _markChanged;
    private _repositoryChanged;
    private _statusChanged;
}
export declare class BranchMarker implements Git.IBranchMarker {
    private _refresh;
    constructor(_refresh: () => void);
    add(fname: string, mark?: boolean): void;
    get(fname: string): boolean;
    set(fname: string, mark: boolean): void;
    toggle(fname: string): void;
    private _marks;
}
export declare class Markers {
    private _refresh;
    constructor(_refresh: () => void);
    get(path: string, branch: string): BranchMarker;
    static markerKey(path: string, branch: string): string;
    private _branchMarkers;
}
