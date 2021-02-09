import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { GitExtension } from '../model';
import { Git } from '../tokens';
export interface IFileListState {
    selectedFile: Git.IStatusFile | null;
}
export interface IFileListProps {
    /**
     * Modified files
     */
    files: Git.IStatusFile[];
    /**
     * Git extension model
     */
    model: GitExtension;
    /**
     * Jupyter App commands registry
     */
    commands: CommandRegistry;
    /**
     * Extension settings
     */
    settings: ISettingRegistry.ISettings;
}
export declare class FileList extends React.Component<IFileListProps, IFileListState> {
    constructor(props: IFileListProps);
    /**
     * Open the context menu on the advanced view
     *
     * @param selectedFile The file on which the context menu is opened
     * @param event The click event
     */
    openContextMenu: (selectedFile: Git.IStatusFile, event: React.MouseEvent) => void;
    /**
     * Open the context menu on the simple view
     *
     * @param selectedFile The file on which the context menu is opened
     * @param event The click event
     */
    openSimpleContextMenu: (selectedFile: Git.IStatusFile, event: React.MouseEvent) => void;
    /** Reset all staged files */
    resetAllStagedFiles: (event: React.MouseEvent) => Promise<void>;
    /** Reset a specific staged file */
    resetStagedFile: (file: string) => Promise<void>;
    /** Add all unstaged files */
    addAllUnstagedFiles: (event: React.MouseEvent) => Promise<void>;
    /** Discard changes in all unstaged files */
    discardAllUnstagedFiles: (event: React.MouseEvent) => Promise<void>;
    /** Discard changes in all unstaged and staged files */
    discardAllChanges: (event: React.MouseEvent) => Promise<void>;
    /** Add a specific unstaged file */
    addFile: (...file: string[]) => Promise<void>;
    /** Discard changes in a specific unstaged or staged file */
    discardChanges: (file: Git.IStatusFile) => Promise<void>;
    /** Add all untracked files */
    addAllUntrackedFiles: (event: React.MouseEvent) => Promise<void>;
    addAllMarkedFiles: () => Promise<void>;
    updateSelectedFile: (file: Git.IStatusFile | null) => void;
    get markedFiles(): Git.IStatusFile[];
    /**
     * Render the modified files
     */
    render(): JSX.Element;
    /**
     * Test if a file is selected
     * @param candidate file to test
     */
    private _isSelectedFile;
    /**
     * Render a staged file
     *
     * Note: This is actually a React.FunctionComponent but defined as
     * a private method as it needs access to FileList properties.
     *
     * @param rowProps Row properties
     */
    private _renderStagedRow;
    /**
     * Render the staged files list.
     *
     * @param files The staged files
     * @param height The height of the HTML element
     */
    private _renderStaged;
    /**
     * Render a changed file
     *
     * Note: This is actually a React.FunctionComponent but defined as
     * a private method as it needs access to FileList properties.
     *
     * @param rowProps Row properties
     */
    private _renderChangedRow;
    /**
     * Render the changed files list
     *
     * @param files Changed files
     * @param height Height of the HTML element
     */
    private _renderChanged;
    /**
     * Render a untracked file.
     *
     * Note: This is actually a React.FunctionComponent but defined as
     * a private method as it needs access to FileList properties.
     *
     * @param rowProps Row properties
     */
    private _renderUntrackedRow;
    /**
     * Render the untracked files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    private _renderUntracked;
    /**
     * Render a modified file in simple mode.
     *
     * Note: This is actually a React.FunctionComponent but defined as
     * a private method as it needs access to FileList properties.
     *
     * @param rowProps Row properties
     */
    private _renderSimpleStageRow;
    /**
     * Render the modified files in simple mode.
     *
     * @param files Modified files
     * @param height Height of the HTML element
     */
    private _renderSimpleStage;
    /**
     * Creates a button element which, depending on the settings, is used
     * to either request a diff of the file, or open the file
     *
     * @param path File path of interest
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    private _createDiffButton;
    /**
     * Returns a callback which opens a diff of the file
     *
     * @param file File to open diff for
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    private _openDiffView;
}
