/**
 * Storage Manager Factory
 * Creates reusable CRUD managers for different collections (cart, favorites, etc.)
 * Each manager interacts with localStorage under a unique key.
 */

const createStorageManager = (key, field) => {
  const get = () => {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : {};
    return Array.isArray(parsed[field]) ? parsed[field] : [];
  };

  const save = (items) => {
    localStorage.setItem(key, JSON.stringify({ [field]: items }));
  };

  const add = (newItems) => {
    const current = get();
    const ids = new Set(current.map((item) => item.id));

    let itemsToAdd = [];

    if (Array.isArray(newItems)) {
        // Case 1: multiple items
        itemsToAdd = newItems.filter((item) => !ids.has(item.id));
    } else if (newItems && !ids.has(newItems.id)) {
        // Case 2: single item
        itemsToAdd = [newItems];
    }

    const updated = [...current, ...itemsToAdd];
    save(updated);
    return updated;
};

  const remove = (id) => {
    const updated = get().filter((item) => item.id !== id);
    save(updated);
    return updated;
  };

  const clear = () => localStorage.removeItem(key);

  const exists = (id) => get().some((item) => item.id === id);

  return { get, add, remove, clear, exists };
};

export default createStorageManager