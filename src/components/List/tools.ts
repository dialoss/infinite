export function getSelectedUsers(listRef) {
    return Array.from(listRef.current.getSelectedRows().values());
}