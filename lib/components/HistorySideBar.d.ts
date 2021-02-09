import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { GitExtension } from '../model';
import { Git } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface IHistorySideBarProps {
    /**
     * List of commits.
     */
    commits: Git.ISingleCommitInfo[];
    /**
     * List of branches.
     */
    branches: Git.IBranch[];
    /**
     * Git extension data model.
     */
    model: GitExtension;
    /**
     * Jupyter App commands registry
     */
    commands: CommandRegistry;
}
/**
 * Returns a React component for displaying commit history.
 *
 * @param props - component properties
 * @returns React element
 */
export declare const HistorySideBar: React.FunctionComponent<IHistorySideBarProps>;
