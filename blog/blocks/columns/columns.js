function buildSplit(splitVal) {
  const newCol = document.createElement('div');
  newCol.classList.add(`column${splitVal}`);
  return newCol;
}

function findSplitSubType(val) {
  let isSplitSubType = false;
  let splitVals = null;
  // Looking for sub types like: 8-4, 6-6, 3-9, 2-10, 2-5-3-2, or 4-8-4
  if (val?.length < 12 && val?.includes('-')) {
    splitVals = val.split('-');
    // Make sure all splitVals are 1-2 digit numbers
    isSplitSubType = splitVals.every((s) => s.match(/^\d{1,2}$/));
  }

  return isSplitSubType ? splitVals : null;
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  if (block.classList.contains('small-icons')) {
    cols[0].parentElement.classList.add('column-small-icons-container');
    cols.forEach((col) => col.classList.add(`icon-${cols.length}-cols`));
  } else if (block.classList.contains('step')) {
    cols[0].parentElement.classList.add('step-wrap');
    cols[0].classList.add('step-left');
    cols[1].classList.add('step-right');
  } else if (cols.length === 2) {
    let splitVals = null;
    [...block.classList].some((c) => {
      splitVals = findSplitSubType(c);
      return splitVals;
    });

    if (splitVals) {
      const extraSplits = splitVals.length > 2 ? 1 : 0;
      const colParent = cols[0].parentElement;

      colParent.classList.add('column-flex-container');
      cols.forEach((col, i) => {
        col.classList.add(`column${splitVals[i + extraSplits]}`);
        if (col.querySelector('img')) col.classList.add('img-col');
        else col.classList.add('non-img-col');
      });

      if (extraSplits) {
        // Add extra column splits for cases like: 2/5/3/2 or 4/8/4
        if (splitVals[0] !== '0') colParent.insertBefore(buildSplit(splitVals[0]), cols[0]);
        if (splitVals[3] && splitVals[3] !== '0') colParent.appendChild(buildSplit(splitVals[3]));
      }
    }
  }
}
