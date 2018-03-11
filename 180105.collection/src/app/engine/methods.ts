// view: load, eval
const loadCollectionListResource = async function (view, resource, pages, callback) {
    pages = pages || []
    const callbackPromises = []
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        await view.load(resource.entry.replace('[PAGE]', page))
        if (resource.lazyload) {
            await view.eval(async function (kit) {
                await kit.scrollTopBottom()
            })
        }
        const result = await view.eval(`async function (kit, params) {
            let [selector, structure] = params
            let elms = Array.from(kit.qsa(selector))
            let results = []
            for (let i = 0; i < elms.length; i++) {
                let elm = elms[i]
                let result = {}
                for (let j = 0; j < structure.length; j++) {
                    let field = structure[j]
                    let extractElm = field.selector ? elm.querySelector(field.selector) : elm
                    result[field.name] = await kit.extract(extractElm, field.method)
                }
                results.push(result)
            }
            return results
        }`, [resource.itemSelector, resource.itemStructure])
        callbackPromises.push(callback(result, page))
    }
    await Promise.all(callbackPromises)
}

export {
    loadCollectionListResource
}