document.querySelectorAll('li').forEach(element => element.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();

  let innerLists = element.querySelector('ul');
  if (innerLists) {
    if (!innerLists.classList.contains("show-list")) {
      document.querySelector("ul").querySelectorAll("ul").forEach(elm => {
        if (!isDescendant(elm, element)) {
          elm.classList.remove("show-list")
        }
      });
    }

    innerLists.classList.toggle("show-list");
  }
}));

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}