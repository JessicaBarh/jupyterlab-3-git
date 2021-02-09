import { Widget } from '@lumino/widgets';
import { statusWidgetClass } from '../style/StatusWidget';
import { sleep } from '../utils';
/**
 * Class for creating a status bar widget.
 */
export class StatusWidget extends Widget {
    /**
     * Returns a status bar widget.
     *
     * @returns widget
     */
    constructor() {
        super();
        /**
         * Boolean indicating whether the status widget is accepting updates.
         */
        this._locked = false;
        /**
         * Status string.
         */
        this._status = '';
        this.addClass(statusWidgetClass);
    }
    /**
     * Sets the current status.
     */
    set status(text) {
        this._status = text;
        if (!this._locked) {
            this._lock();
            this.refresh();
        }
    }
    /**
     * Refreshes the status widget.
     */
    refresh() {
        this.node.textContent = 'Git: ' + this._status;
    }
    /**
     * Locks the status widget to prevent updates.
     *
     * ## Notes
     *
     * -   This is used to throttle updates in order to prevent "flashing" messages.
     */
    async _lock() {
        this._locked = true;
        await sleep(500);
        this._locked = false;
        this.refresh();
    }
}
export function addStatusBarWidget(statusBar, model, settings) {
    // Add a status bar widget to provide Git status updates:
    const statusWidget = new StatusWidget();
    statusBar.registerStatusItem('git-status', {
        align: 'left',
        item: statusWidget,
        isActive: Private.isStatusWidgetActive(settings),
        activeStateChanged: settings && settings.changed
    });
    model.taskChanged.connect(Private.createEventCallback(statusWidget));
}
/* eslint-disable no-inner-declarations */
var Private;
(function (Private) {
    /**
     * Returns a callback for updating a status widget upon receiving model events.
     *
     * @private
     * @param widget - status widget
     * @returns callback
     */
    function createEventCallback(widget) {
        return onEvent;
        /**
         * Callback invoked upon a model event.
         *
         * @private
         * @param model - extension model
         * @param event - event name
         */
        function onEvent(model, event) {
            let status;
            switch (event) {
                case 'empty':
                    status = 'idle';
                    break;
                case 'git:checkout':
                    status = 'checking out...';
                    break;
                case 'git:clone':
                    status = 'cloning repository...';
                    break;
                case 'git:commit:create':
                    status = 'committing changes...';
                    break;
                case 'git:commit:revert':
                    status = 'reverting changes...';
                    break;
                case 'git:init':
                    status = 'initializing repository...';
                    break;
                case 'git:pull':
                    status = 'pulling changes...';
                    break;
                case 'git:pushing':
                    status = 'pushing changes...';
                    break;
                case 'git:refresh':
                    status = 'refreshing...';
                    break;
                case 'git:reset:changes':
                    status = 'resetting changes...';
                    break;
                case 'git:reset:hard':
                    status = 'discarding changes...';
                    break;
                default:
                    if (/git:add:files/.test(event)) {
                        status = 'adding files...';
                    }
                    else {
                        status = 'working...';
                    }
                    break;
            }
            widget.status = status;
        }
    }
    Private.createEventCallback = createEventCallback;
    /**
     * Returns a callback which returns a boolean indicating whether the extension should display status updates.
     *
     * @private
     * @param settings - extension settings
     * @returns callback
     */
    function isStatusWidgetActive(settings) {
        return settings ? isActive : inactive;
        /**
         * Returns a boolean indicating that the extension should not display status updates.
         *
         * @private
         * @returns boolean indicating that the extension should not display status updates
         */
        function inactive() {
            return false;
        }
        /**
         * Returns a boolean indicating whether the extension should display status updates.
         *
         * @private
         * @returns boolean indicating whether the extension should display status updates
         */
        function isActive() {
            return settings.composite.displayStatus;
        }
    }
    Private.isStatusWidgetActive = isStatusWidgetActive;
})(Private || (Private = {}));
/* eslint-enable no-inner-declarations */
//# sourceMappingURL=StatusWidget.js.map