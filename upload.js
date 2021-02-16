function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}





export function upload(selector, options = {}) {


    const input = document.querySelector(selector);
    const previewBox = document.createElement('div');
    previewBox.classList.add('previewBox');

    if (options.multi) {
        input.multiple = true;
        // input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {

        input.setAttribute('accept', options.accept.join(', '))

    }

    const openButton = document.createElement('button');
    openButton.classList.add('btn');
    openButton.textContent = 'Open';

    input.insertAdjacentElement("afterend", openButton);

    const triggerInput = () => input.click();
    const changeHandler = event => {

        if (!event.target.files) {
            return
        }
        openButton.insertAdjacentElement('afterend', previewBox);
        previewBox.innerHTML = '';
        const files = Array.from(event.target.files);
        console.log(Array.isArray(files));

        files.forEach(file => {

                if (!file.type.match('image')) return;


                // console.log(file);


                const reader = new FileReader();

                reader.onload = ev => {
                    console.log(ev);
                    // previewBox.innerHTML += `<img src="${ev.target.result}" />`;
                    previewBox.insertAdjacentHTML('afterbegin', `
<div class="preview-img">
<div class="preview-remove">&times;</div>
<img src="${ev.target.result}" />
<div class="preview-info"><span>Size:</span> ${bytesToSize(file.size)}</div>
</div>`)
                    // input.insertAdjacentHTML('afterend', `<img src="${ev.target.result}" />`)
                };


                reader.readAsDataURL(file);
            }
        )
    }

    openButton.addEventListener('click', triggerInput);

    input.addEventListener('change', changeHandler);


}