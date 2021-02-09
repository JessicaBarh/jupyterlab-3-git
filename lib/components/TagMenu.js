import { Dialog, showDialog, showErrorMessage } from '@jupyterlab/apputils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { nameClass, filterClass, filterClearClass, filterInputClass, filterWrapperClass, listItemClass, listItemIconClass, wrapperClass } from '../style/BranchMenu';
import { tagIcon } from '../style/icons';
import { Level } from '../tokens';
const CHANGES_ERR_MSG = 'The repository contains files with uncommitted changes. Please commit or discard these changes before switching to a tag.';
const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the tags list
const MAX_HEIGHT = 400; // Maximal HTML element height for the tags list
/**
 * Callback invoked upon encountering an error when switching tags.
 *
 * @private
 * @param error - error
 * @param logger - the logger
 */
function onTagError(error, logger) {
    if (error.message.includes('following files would be overwritten')) {
        // Empty log message to hide the executing alert
        logger.log({
            message: '',
            level: Level.INFO
        });
        showDialog({
            title: 'Unable to checkout tag',
            body: (React.createElement(React.Fragment, null,
                React.createElement("p", null, "Your changes to the following files would be overwritten by switching:"),
                React.createElement(List, null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                React.createElement("span", null, "Please commit, stash, or discard your changes before you checkout tags."))),
            buttons: [Dialog.okButton({ label: 'Dismiss' })]
        });
    }
    else {
        logger.log({
            level: Level.ERROR,
            message: 'Failed to checkout tag.',
            error
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return React.createElement(ListItem, { key: filename }, filename);
}
/**
 * React component for rendering a branch menu.
 */
export class TagMenu extends React.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const tag = data[index];
            return (React.createElement(ListItem, { button: true, title: `Checkout to tag: ${tag}`, className: listItemClass, onClick: this._onTagClickFactory(tag), style: style },
                React.createElement(tagIcon.react, { className: listItemIconClass, tag: "span" }),
                React.createElement("span", { className: nameClass }, tag)));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        this.state = {
            filter: '',
            tags: []
        };
    }
    componentDidMount() {
        this.props.model
            .tags()
            .then(response => {
            this.setState({
                tags: response.tags
            });
        })
            .catch(error => {
            console.error(error);
            this.setState({
                tags: []
            });
            showErrorMessage('Fail to get the tags.', error);
        });
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("div", { className: wrapperClass },
            this._renderFilter(),
            this._renderTagList()));
    }
    /**
     * Renders a branch input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (React.createElement("div", { className: filterWrapperClass },
            React.createElement("div", { className: filterClass },
                React.createElement("input", { className: filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: "Filter", title: "Filter branch menu" }),
                this.state.filter ? (React.createElement("button", { className: filterClearClass },
                    React.createElement(ClearIcon, { titleAccess: "Clear the current filter", fontSize: "small", onClick: this._resetFilter }))) : null)));
    }
    /**
     * Renders a
     *
     * @returns React element
     */
    _renderTagList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const tags = this.state.tags.filter(tag => !filter || tag.includes(filter));
        return (React.createElement(FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, tags.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: tags.length, itemData: tags, itemKey: (index, data) => data[index], itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Returns a callback which is invoked upon clicking a tag.
     *
     * @param branch - tag
     * @returns callback
     */
    _onTagClickFactory(tag) {
        const self = this;
        return onClick;
        /**
         * Callback invoked upon clicking a tag.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch tags
         */
        async function onClick() {
            if (!self.props.branching) {
                showErrorMessage('Checkout tags is disabled', CHANGES_ERR_MSG);
                return;
            }
            self.props.logger.log({
                level: Level.RUNNING,
                message: 'Checking tag out...'
            });
            try {
                await self.props.model.checkoutTag(tag);
            }
            catch (err) {
                return onTagError(err, self.props.logger);
            }
            self.props.logger.log({
                level: Level.SUCCESS,
                message: 'Tag checkout.'
            });
        }
    }
}
//# sourceMappingURL=TagMenu.js.map