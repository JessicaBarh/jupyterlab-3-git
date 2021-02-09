import * as React from 'react';
import { GitExtension } from '../model';
import { Git } from '../tokens';
export declare const STATUS_CODES: {
    M: string;
    A: string;
    D: string;
    R: string;
    C: string;
    U: string;
    '?': string;
    '!': string;
};
/**
 * File item properties
 */
export interface IFileItemProps {
    /**
     * Action buttons on the file
     */
    actions?: React.ReactElement;
    /**
     * Callback to open a context menu on the file
     */
    contextMenu?: (file: Git.IStatusFile, event: React.MouseEvent) => void;
    /**
     * File model
     */
    file: Git.IStatusFile;
    /**
     * Is the file marked?
     */
    markBox?: boolean;
    /**
     * Git repository model
     */
    model: GitExtension;
    /**
     * Callback on double click
     */
    onDoubleClick: () => void;
    /**
     * Is the file selected?
     */
    selected?: boolean;
    /**
     * Callback to select the file
     */
    selectFile?: (file: Git.IStatusFile | null) => void;
    /**
     * Inline styling for the windowing
     */
    style: React.CSSProperties;
}
export declare class FileItem extends React.PureComponent<IFileItemProps> {
    protected _getFileChangedLabel(change: keyof typeof STATUS_CODES): string;
    protected _getFileChangedLabelClass(change: string): string;
    protected _getFileClass(): string;
    render(): JSX.Element;
}
