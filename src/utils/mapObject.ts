
interface obj {
    [key: string]: string;
}

export default function mapObject(srcObj: obj, mapObj: obj): obj {
    let result: obj = {};
    for (let key in mapObj) {
        result[mapObj[key]] = srcObj[key]
    }

    return result;
}