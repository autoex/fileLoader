export function upload(selector, options = {}) {


    const input = document.querySelector(selector);

    if (options.multi) {
        input.multiple = true;
        // input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {

        input.setAttribute('accept', options.accept.join(', ') )

    }

    const openButton = document.createElement('button');
    openButton.classList.add('btn');
    openButton.textContent = 'Open';

    input.insertAdjacentElement("afterend", openButton);

    const triggerInput = () => input.click();
    const changeHandler = event => {

        if(!event.target.files) {
            return
        }

        const files = Array.from(event.target.files);
        console.log(Array.isArray(files));

        files.forEach(file => {

            if(!file.type.match('image')) return;


            console.log(file);}
            )
    }

    openButton.addEventListener('click', triggerInput);

    input.addEventListener('change', changeHandler);


}