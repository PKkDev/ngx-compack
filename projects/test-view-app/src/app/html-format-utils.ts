export const formatHtml = (html: string, rowAttributes: number): string => {

    if (html == '') return '';

    html = htmlToLine(html);
    //console.log('line', html);

    const tab = '\t';
    let result = '';
    let indent = '';
    const selfClosingTag: string[] = ['<area', '<base', '<br', '<col', '<command', '<embed', '<hr', '<img', '<input', '<keygen', '<link', '<menuitem', '<meta', '<param', '<source', '<track', '<wbr', '<path'];

    html = html.replace('&gt;', '>');
    html = html.replace('&lt;', '<');

    // console.log(html.split(/(?=<)|(?<=>)/));
    //  html.split(/(?=<)|(?<=>)/).forEach(x => console.log(x.trim().length));

    html.split(/(?=<)|(?<=>)/)
        .filter(x => x.trim().length != 0)
        .map(x => x.trim())
        .forEach((element) => {
            if (element.match(/^<\/\w/)) {
                indent = indent.substring(tab.length);
            }

            //   console.log('element', element);

            let tag = element;
            const attributes: string[] = [];

            if (element.startsWith('<')) {

                const pos = element.indexOf(" ");
                tag = pos != -1 ? element.substring(0, pos) : element;

                // const regex = new RegExp(/[A-Za-z0-9-_\[\]\(\)]*=\".*?\"|[A-Za-z0-9-_]*/gm);
                const regex = new RegExp(/[A-Za-z0-9-_[\]()]*=".*?"|[A-Za-z0-9-_]*/gm);
                let m;
                while ((m = regex.exec(element)) !== null) {
                    if (m.index === regex.lastIndex)
                        regex.lastIndex++;
                    m.forEach((match) => {
                        if (match)
                            attributes.push(match.trim());
                    }
                    );
                }
                attributes.shift();

            }

            //  console.log('tag', tag);
            //   console.log('attributes', attributes);

            // result += indent  + element + '\r\n';

            const indentClone = indent.slice();
            result += indent + tag + mapAtr(attributes, indentClone + ' '.repeat(tag.length + 1), rowAttributes);
            if (tag.startsWith('<') && !tag.endsWith('>')) {
                result += '>' + '\r\n';
            } else {
                result += '\r\n';
            }

            // result += indent + tag + ((tag.startsWith('<') && !tag.endsWith('>')) ? '>' : '') + '\r\n';


            // if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
            //   indent += tab;
            // }

            if (element.match(/^<\w/) && selfClosingTag.find(x => element.startsWith(x)) == null) {
                indent += tab;
            }

        });

    // return result.substring(1, result.length - 3);
    // return result.substring(0, result.length - 3);
    return result;
}

export const htmlToLine = (html: string): string => {
    return html.replace(/(\r\n|\n|\r)/gm, "").replace(/\n/g, '').replace(/\t/g, '').replace(/\s+/g, ' ').trim();
}

export const mapAtr = (attributes: string[], space: string, rowElements: number): string => {

    if (attributes.length == 1)
        return ' ' + attributes[0];

    let result = '';
    attributes.forEach((item, index) => {

        if (index == 0) {
            result += ' ' + item
        } else {
            if (index % rowElements != 0) {
                result += ' ' + item
            } else {
                result += '\r\n' + space + item
            }
        }

    });

    return result;
}