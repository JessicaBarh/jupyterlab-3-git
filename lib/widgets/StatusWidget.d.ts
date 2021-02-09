import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { IStatusBar } from '@jupyterlab/statusbar';
import { Widget } from '@lumino/widgets';
import { IGitExtension } from '../tokens';
/**
 * Class for creating a status bar widget.
 */
export declare class StatusWidget extends Widget {
    /**
     * Returns a status bar widget.
     *
     * @returns widget
     */
    constructor();
    /**
     * Sets the current status.
     */
    set status(text: string);
    /**
     * Refreshes the status widget.
     */
    refresh(): void;
    /**
     * Locks the status widget to prevent updates.
     *
     * ## Notes
     *
     * -   This is used to throttle updates in order to prevent "flashing" messages.
     */
    _lock(): Promise<void>;
    /**
     * Boolean indicating whether the status widget is accepting updates.
     */
    private _locked;
    /**
     * Status string.
     */
    private _status;
}
export declare function addStatusBarWidget(statusBar: IStatusBar, model: IGitExtension, settings: ISettingRegistry.ISettings): void;
