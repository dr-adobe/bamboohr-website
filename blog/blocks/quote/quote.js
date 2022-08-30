export default function decorate(block) {
  const byline = block.querySelector('em');

  // Adding image class to block children
  [...block.children].forEach((row) => [...row.children].forEach((cell) => cell.classList.add(cell.querySelector('img') ? 'image' : 'content')));

  // if byline
  if (byline) {
    byline.parentNode.classList.add('byline');
    byline.parentNode.textContent = byline.textContent;
  }
}
