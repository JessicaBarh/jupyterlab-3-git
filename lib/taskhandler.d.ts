import { ISignal } from '@lumino/signaling';
/**
 * A generic task handler
 */
export declare class TaskHandler<T> {
    constructor(model: T);
    /**
     * Signal emitted when a task starts
     *
     * 'empty' is emitted each time the task list have processed all tasks
     */
    get taskChanged(): ISignal<T, string>;
    /**
     * Adds a task to the list of pending model tasks.
     *
     * #Note:
     *  This will add a task name in the queue but the task
     *  execution remains in the hand of the caller.
     *  In particular it is the responsibility of the caller
     *  to call `remove(taskID)` when the task is executed.
     *
     * @param task - task name
     * @returns task identifier
     */
    add(task: string): string;
    /**
     * Add a asynchronous task to the stack and execute it
     *
     * @param name Name of the task
     * @param callable Asynchronous task to be executed
     *
     * @returns The result of the task
     */
    execute<R>(name: string, callable: () => Promise<R>): Promise<R>;
    /**
     * Removes a task from the list of pending model tasks.
     *
     * @param id - task identifier
     */
    remove(taskID: string): void;
    /**
     * Generates a unique task identifier.
     *
     * @returns task identifier
     */
    private _generateTaskID;
    private _taskChanged;
    private _taskList;
}
