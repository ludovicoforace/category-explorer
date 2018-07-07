export function nestCategoryChildren(arr, parent) {
  const out = [];
  arr.forEach(item => {
    if (Number(item.parent_id) == parent) {
      const children = nestCategoryChildren(arr, item.id);

      if (children.length) {
        item.children = children;
      }

      out.push(item);
    }
  });
  return out;
}
