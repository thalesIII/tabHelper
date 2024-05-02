export const parseGuitarTab = (tabText) => {
    if(!tabText || !tabText.length) {
        return 'Could not read tab... Try a different one.'
    };
    
    let printedTab = '';
    const sections = tabText.split('[/tab]'); // split sections by [tab] tag

    for (const section of sections) {
        const printedSection = section.replace(' ', '\n').replace('[tab]', '');
        printedTab += printedSection + '\n\n';
    }

    return printedTab;
}  