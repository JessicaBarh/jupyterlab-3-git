import * as React from 'react';
import { historySideBarStyle } from '../style/HistorySideBarStyle';
import { PastCommitNode } from './PastCommitNode';
/**
 * Returns a React component for displaying commit history.
 *
 * @param props - component properties
 * @returns React element
 */
export const HistorySideBar = (props) => (React.createElement("ol", { className: historySideBarStyle }, props.commits.map((commit) => (React.createElement(PastCommitNode, { key: commit.commit, commit: commit, branches: props.branches, model: props.model, commands: props.commands })))));
//# sourceMappingURL=HistorySideBar.js.map