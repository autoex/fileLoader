import {upload} from './upload.js'

upload('#loadFile', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif']
})

