function wait(ms = 0) {
  return new Promise(async function(resolve) {
    setTimeout(resolve, ms);
  });
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  popup = null;
}

function ask(options) {
  return new Promise(async function(resolve) {
    // first create a popup
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input"/>
        <button type="submit">Submit</button>
      </fieldset>
    `
    );
    console.log(popup);

    // check if they want a cancel btn
    if (options.cancel) {
      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.textContent = 'Cancel';
      popup.firstElementChild.append(skipBtn);
      skipBtn.addEventListener(
        'click',
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    // listen for submit event on input
    popup.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
        resolve(e.target.input.value);
        // remove it from the dom
        destroyPopup(popup);
      },
      // remove the listener by passing the once options
      { once: true }
    );

    // when someone does submit, resolve the data that was in the input box
    // insert popup into dom
    document.body.appendChild(popup);
    // put a small timeout to fadeout pop up due to event loop timing
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(event) {
  const button = event.currentTarget;
  const shouldCancel = 'cancel' in button.dataset;
  const answer = await ask({ title: button.dataset.question, cancel: shouldCancel });
  console.log(answer);
}

// select all btns that have a question
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(btn => btn.addEventListener('click', askQuestion));

// pop up in series
const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: 'What is your dogs name?' },
];

async function askMany() {
  for (const question of questions) {
    const answer = await ask(question);
    console.log(answer);
  }
}

askMany();
