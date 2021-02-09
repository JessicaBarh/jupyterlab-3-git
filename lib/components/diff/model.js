/**
 * Utility method to get the string value of any type of ref.
 */
export function getRefValue(ref) {
    if ('specialRef' in ref) {
        return ref.specialRef;
    }
    else {
        return ref.gitRef;
    }
}
//# sourceMappingURL=model.js.map