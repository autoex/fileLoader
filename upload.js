function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


const element =(tag, classes=[], content)=> {
   const node = document.createElement(tag);

    if(classes.length) node.classList.add(...classes);

   if(content) node.textContent = content;


   return node
};


export function upload(selector, options = {}) {
    let files = [];

    const input = document.querySelector(selector);
    const previewBox = element('div', ['previewBox']);




    if (options.multi) {
        input.multiple = true;
        // input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {

        input.setAttribute('accept', options.accept.join(', '))

    }



    const openButton = element('button', ['btn'], 'Open');
    const loadButton = element('button', ['btn', 'primary'], 'Load');
    loadButton.style.display = 'none';


    input.insertAdjacentElement("afterend", openButton);
    input.insertAdjacentElement("afterend", loadButton);

    const triggerInput = () => input.click();
    const changeHandler = event => {

        if (!event.target.files) {
            return
        }
        loadButton.style.display = '';
        openButton.insertAdjacentElement('afterend', previewBox);
        previewBox.innerHTML = '';
        files = Array.from(event.target.files);
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
                            <div class="preview-remove" data-name="${file.name}">&times;</div>
                            <img src="${ev.target.result}" alt="${file.name}" />
                            <div class="preview-info"><span>Size:</span> ${bytesToSize(file.size)}</div>
                            </div>`)
                    // input.insertAdjacentHTML('afterend', `<img src="${ev.target.result}" />`)
                };


                reader.readAsDataURL(file);
            }
        )
    };

    let removeHandler = event => {
        if (!event.target.dataset.name) return;

        const {name} = event.target.dataset;

        files = files.filter(file => file.name !== name);
        if(!files.length) loadButton.style.display = 'none';



        let block = document.querySelector(`[data-name="${name}"]`).closest('.preview-img');

        block.classList.add('preview-removing');
        setTimeout(()=>block.remove(), 300);


        console.log(block);




        console.log(name);
        console.log(files);
    };

    const uploadHandler =(e)=> {
      console.log(e.target.textContent)
    };

    openButton.addEventListener('click', triggerInput);

    input.addEventListener('change', changeHandler);

    previewBox.addEventListener('click', removeHandler);
    loadButton.addEventListener('click', uploadHandler);


}