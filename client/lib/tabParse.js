export const parseGuitarTab = (tabText) => {
    let printedTab = '';
    if(!tabText || !tabText.length) return printedTab;

    const sections = tabText.split('[/tab]'); // split sections by [tab] tag

    for (const section of sections) {
        const printedSection = section.replace(' ', '\n').replace('[tab]', '');
        printedTab += printedSection + '\n\n';
    }

    return printedTab;
}  