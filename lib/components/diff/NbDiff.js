import { PathExt } from '@jupyterlab/coreutils';
import { NotebookDiffModel } from 'nbdime/lib/diff/model';
import { CellDiffWidget } from 'nbdime/lib/diff/widget';
import * as React from 'react';
import { requestAPI } from '../../git';
import { RenderMimeConsumer } from './Diff';
import { NBDiffHeader } from './NBDiffHeader';
/**
 * A React component which renders the diff is a single Notebook cell.
 *
 * This uses the NBDime PhosporJS CellDiffWidget internally. To get around the
 * PhosporJS <=> ReactJS barrier, it uses React Refs(https://reactjs.org/docs/refs-and-the-dom.html)
 *
 * During component render, a Ref is created for the ReactDOM and after the component
 * is mounted, the PhosporJS widget is created and attached to the Ref.
 */
export class CellDiff extends React.Component {
    constructor(props) {
        super(props);
        this.unAddedOrRemovedRef = React.createRef();
        this.addedRef = React.createRef();
        this.removedRef = React.createRef();
    }
    componentDidMount() {
        const chunk = this.props.cellChunk;
        if (chunk.length === 1 && !(chunk[0].added || chunk[0].deleted)) {
            const widget = new CellDiffWidget(chunk[0], this.renderMimeRegistry, this.props.mimeType);
            this.unAddedOrRemovedRef.current.appendChild(widget.node);
        }
        else {
            for (let j = 0; j < chunk.length; j++) {
                const cell = chunk[j];
                const ref = cell.deleted ? this.removedRef : this.addedRef;
                const widget = new CellDiffWidget(cell, this.renderMimeRegistry, this.props.mimeType);
                ref.current.appendChild(widget.node);
            }
        }
    }
    render() {
        const chunk = this.props.cellChunk;
        return (React.createElement(RenderMimeConsumer, null, (value) => {
            this.renderMimeRegistry = value;
            return (React.createElement(React.Fragment, null, chunk.length === 1 && !(chunk[0].added || chunk[0].deleted) ? (React.createElement("div", { ref: this.unAddedOrRemovedRef })) : (React.createElement("div", { className: 'jp-Diff-addremchunk' },
                React.createElement("div", { className: 'jp-Diff-addedchunk', ref: this.addedRef }),
                React.createElement("div", { className: 'jp-Diff-removedchunk', ref: this.removedRef })))));
        }));
    }
}
/**
 * A React component to render the diff of a single Notebook file.
 *
 * 1. It calls the `/nbdime/api/gitdiff` API on the server to get the diff model
 * 2. Renders the Diff header
 * 3. For each cell, invokes the CellDiff component
 */
export class NBDiff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbdModel: undefined,
            errorMessage: undefined
        };
    }
    componentDidMount() {
        this.performDiff(this.props.diffContext);
    }
    render() {
        if (this.state.errorMessage !== undefined) {
            return (React.createElement("div", null,
                React.createElement("span", { className: "jp-git-diff-error" },
                    "Failed to fetch diff with error:",
                    React.createElement("span", { className: "jp-git-diff-error-message" }, this.state.errorMessage))));
        }
        else if (this.state.nbdModel !== undefined) {
            const cellComponents = this.state.nbdModel.chunkedCells.map((cellChunk, index) => (React.createElement(CellDiff, { key: index, cellChunk: cellChunk, mimeType: this.state.nbdModel.mimetype })));
            return (React.createElement("div", { className: "jp-git-diff-Widget" },
                React.createElement("div", { className: "jp-git-diff-root jp-mod-hideunchanged" },
                    React.createElement("div", { className: "jp-git-Notebook-diff" },
                        React.createElement(NBDiffHeader, Object.assign({}, this.props)),
                        cellComponents))));
        }
        else {
            return null;
        }
    }
    /**
     * Based on the Diff Context , calls the server API with the revant parameters
     * to
     * @param diffContext the context in which to perform the diff
     */
    performDiff(diffContext) {
        // Resolve what API parameter to call.
        let currentRefValue;
        if ('specialRef' in diffContext.currentRef) {
            currentRefValue = {
                special: diffContext.currentRef.specialRef
            };
        }
        else {
            currentRefValue = {
                git: diffContext.currentRef.gitRef
            };
        }
        requestAPI('gitdiff', 'POST', {
            file_path: PathExt.join(this.props.topRepoPath, this.props.path),
            ref_local: { git: diffContext.previousRef.gitRef },
            ref_remote: currentRefValue
        }, 'nbdime/api')
            .then((data) => {
            const base = data.base;
            const diff = data.diff;
            const nbdModel = new NotebookDiffModel(base, diff);
            this.setState({
                nbdModel: nbdModel
            });
        })
            .catch(reason => {
            // Handle error
            this.setState({
                errorMessage: reason.message || 'Unknown error. Please check the server log.'
            });
        });
    }
}
//# sourceMappingURL=NbDiff.js.map