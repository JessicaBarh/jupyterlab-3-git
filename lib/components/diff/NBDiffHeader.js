import * as React from 'react';
/**
 * A React component to render the header which shows metadata around the diff
 * being rendered. Shows the path to the file and the previous and current ref
 * being used for the diff.
 */
export function NBDiffHeader(props) {
    return (React.createElement("div", null,
        React.createElement("div", { className: "jp-git-diff-header-path" }, props.path),
        React.createElement("div", { className: "jp-Diff-addremchunk jp-git-diff-header" },
            React.createElement("div", { className: "jp-Diff-addedchunk" },
                "Current: ",
                getRefDisplayValue(props.diffContext.currentRef)),
            React.createElement("div", { className: "jp-Diff-removedchunk" },
                "Previous: ",
                getRefDisplayValue(props.diffContext.previousRef)))));
}
/**
 * Utility method to get a user-friendly display text for a given ref.
 */
function getRefDisplayValue(ref) {
    const SPECIAL_REFS = {
        WORKING: {
            displayName: 'Changed'
        },
        INDEX: {
            displayName: 'Staged'
        }
    };
    if ('specialRef' in ref) {
        return SPECIAL_REFS[ref.specialRef].displayName;
    }
    else {
        return ref.gitRef;
    }
}
//# sourceMappingURL=NBDiffHeader.js.map