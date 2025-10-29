/**
 * Storage Manager Factory
 * Each manager uses a unique key (e.g., 'cart', 'favorites')
 * Handles CRUD directly on the array stored in localStorage.
 */

const createStorageManager = (key) => {
  const get = () => {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const save = (items) => {
    localStorage.setItem(key, JSON.stringify(items));
  };

  const add = (newItems) => {
    const current = get();
    const ids = new Set(current.map((item) => item.id));

    let itemsToAdd = [];

    if (Array.isArray(newItems)) {
      // Add multiple
      itemsToAdd = newItems.filter((item) => !ids.has(item.id));
    } else if (newItems && !ids.has(newItems.id)) {
      // Add single
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

  const clear = () => localStorage.setItem(key, JSON.stringify([]));

  const exists = (id) => get().some((item) => item.id === id);

  return { get, add, remove, clear, exists };
};

export default createStorageManager;
