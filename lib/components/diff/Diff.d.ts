import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import * as React from 'react';
import { IDiffContext } from './model';
/**
 * Determines if a given file is supported for diffs.
 *
 * @param path the file path
 */
export declare function isDiffSupported(path: string): boolean;
/** Diff component properties */
export interface IDiffProps {
    /**
     * Path of the file to diff.
     * It is relative to the git repository root folder
     */
    path: string;
    /**
     * Git respository folder path.
     * It is relative to the server root.
     */
    topRepoPath: string;
    /**
     * References to show the diff for.
     */
    diffContext: IDiffContext;
}
/**
 * The parent diff component which maintains a registry of various diff providers.
 * Based on the extension of the file, it delegates to the relevant diff provider.
 */
export declare function Diff(props: IDiffProps): JSX.Element;
export declare const RenderMimeProvider: React.Provider<IRenderMimeRegistry>;
export declare const RenderMimeConsumer: React.Consumer<IRenderMimeRegistry>;
