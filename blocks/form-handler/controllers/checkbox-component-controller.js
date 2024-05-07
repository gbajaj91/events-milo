export default function init(component) {
  const checkboxes = component.querySelectorAll('input[type="checkbox"]');
  const minReg = component.className.match(/min-(.*?)( |$)/);
  const maxReg = component.className.match(/max-(.*?)( |$)/);
  const required = !!minReg;
  const min = minReg ? parseInt(minReg[1], 10) : 0;
  const max = maxReg ? parseInt(maxReg[1], 10) : 0;

  const configs = {
    required,
    min,
    max,
  };

  let boxesChecked = 0;
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        boxesChecked += 1;
      } else {
        boxesChecked -= 1;
      }

      checkboxes.forEach((c) => {
        c.required = boxesChecked < configs.min;
      });

      if (!!configs.max && boxesChecked === configs.max) {
        checkboxes.forEach((c) => {
          if (!c.checked) c.disabled = true;
        });
      } else {
        checkboxes.forEach((c) => {
          c.disabled = false;
        });
      }
    });
  });
}

export function onResume() {
  // TODO: handle form prepopulation on component level
}

export function onSubmit(component, inputMap) {
  console.log(inputMap, 'checkbox onSubmit not built yet');
  return {};
}
