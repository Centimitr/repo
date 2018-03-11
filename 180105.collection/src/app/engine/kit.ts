const kit = `(function () {
    // const imgToImgData = function (img) {
    //     const canvas = document.createElement('canvas');
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     const ctx = canvas.getContext('2d');
    //     ctx.drawImage(img, 0, 0);
    //     return ctx.getImageData(0, 0, canvas.width, canvas.height)
    // };
    // const getImgBuf = function (img) {
    //     return new Promise(function (res) {
    //         const blobToBuffer = function (b) {
    //             return new Promise((resolve, reject) => {
    //                 const toBuf = function (blob, cb) {
    //                     if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
    //                         throw new Error('first argument must be a Blob')
    //                     }
    //                     if (typeof cb !== 'function') {
    //                         throw new Error('second argument must be a function')
    //                     }
    //
    //                     const reader = new FileReader();
    //                     const Buffer = window['Buffer'];
    //
    //                     function onLoadEnd(e) {
    //                         reader.removeEventListener('loadend', onLoadEnd, false);
    //                         if (e.error) {
    //                             cb(e.error);
    //                         } else {
    //                             cb(null, Buffer.from(reader.result));
    //                         }
    //                     }
    //
    //                     reader.addEventListener('loadend', onLoadEnd, false);
    //                     reader.readAsArrayBuffer(blob);
    //                 };
    //                 toBuf(b, function (err, buffer) {
    //                     if (err) {
    //                         reject(err);
    //                     }
    //                     resolve(buffer);
    //                 })
    //             })
    //         };
    //         imgToBlob(img).then(function (blob) {
    //             blobToBuffer(blob).then(function (buffer) {
    //                 res(buffer)
    //             })
    //         })
    //     })
    // };
    // const imgToBlob = function (img) {
    //     const canvas = document.createElement('canvas');
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     const ctx = canvas.getContext('2d');
    //     ctx.drawImage(img, 0, 0);
    //     console.log('draw!')
    //     return new Promise(resolve => canvas.toBlob(resolve));
    // };
    const imgToDataUrl = function (img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL();
    };
    const waitImage = function (_img) {
        return new Promise(function (resolve, reject) {
            let imgLoadTimeout = 30 * 1000
            setTimeout(() => reject(), imgLoadTimeout)
            let img = new Image()
            img.onload = () => resolve(_img)
            img.src = _img.src
        })
    };
    const scrollTopBottom = async function () {
        let height = document.body.scrollHeight
        let cur = 1
        let step = 64
        while (cur < height) {
            await new Promise(resolve => {
                requestAnimationFrame(() => {
                    document.body.scrollTop = cur
                    cur += step
                    resolve()
                })
            })
        }
    }
    let qs = selector => document.querySelector(selector)
    let qsa = selector => document.querySelectorAll(selector)
    let link = elm => elm.querySelector('a').href
    let text = elm => elm.innerText.trim()
    let image = async elm => {
        let img = elm.querySelector('img')
        if (img) {
            await waitImage(img)
            return await imgToDataUrl(img)
        }
    }
    let extract = async (elm, method) => {
        try {
            switch (method) {
                case 'link':
                    return link(elm)
                case 'text':
                    return text(elm)
                case 'image':
                    return await image(elm)
                default:
                    console.warn('extract method unknown:', method)
            }
        } catch (e) {
            console.warn('extract error:', e)
        }

    }
    window['ResourceKit'] = {
        qs, qsa, link, text, scrollTopBottom, image, extract
    }
    return 1
})`

export {
    kit
}
