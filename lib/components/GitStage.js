import { caretDownIcon, caretRightIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { changeStageButtonStyle, sectionAreaStyle, sectionFileContainerStyle, sectionHeaderLabelStyle, sectionHeaderSizeStyle } from '../style/GitStageStyle';
const HEADER_HEIGHT = 34;
const ITEM_HEIGHT = 25;
export const GitStage = (props) => {
    const [showFiles, setShowFiles] = React.useState(true);
    const nFiles = props.files.length;
    return (React.createElement("div", { className: sectionFileContainerStyle },
        React.createElement("div", { className: sectionAreaStyle, onClick: () => {
                if (props.collapsible && nFiles > 0) {
                    setShowFiles(!showFiles);
                }
            } },
            props.collapsible && (React.createElement("button", { className: changeStageButtonStyle }, showFiles && nFiles > 0 ? (React.createElement(caretDownIcon.react, null)) : (React.createElement(caretRightIcon.react, null)))),
            React.createElement("span", { className: sectionHeaderLabelStyle }, props.heading),
            props.actions,
            React.createElement("span", { className: sectionHeaderSizeStyle },
                "(",
                nFiles,
                ")")),
        showFiles && nFiles > 0 && (React.createElement(FixedSizeList, { height: Math.max(Math.min(props.height - HEADER_HEIGHT, nFiles * ITEM_HEIGHT), ITEM_HEIGHT), itemCount: nFiles, itemData: props.files, itemKey: (index, data) => data[index].to, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, props.rowRenderer))));
};
//# sourceMappingURL=GitStage.js.map