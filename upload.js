export function upload(selector, options={}) {



    const input = document.querySelector(selector);

    if(options.multi) {
        input.multiple = true;
        // input.setAttribute('multiple', true)
    }

    const openButton = document.createElement('button');
    openButton.classList.add('btn');
    openButton.textContent = 'Open';

    input.insertAdjacentElement("afterend", openButton );

    const triggerInput =()=> input.click();
    const changeHandler = event => {
        console.log(event.target.files)
    }

    openButton.addEventListener('click', triggerInput);

    input.addEventListener('change', changeHandler);

    
}