import React, { useState } from "react";

const parseGuitarTab = (tabText) => {
    let printedTab = '';
    if(!tabText || !tabText.length) return printedTab;

    const sections = tabText.split('[/tab]'); // split sections by [tab] tag

    for (const section of sections) {
        const printedSection = section.replace(' ', '\n').replace('[tab]', '');
        printedTab += printedSection + '\n\n';
    }

    // console.log('orig ', tabText, 'printedTab ', printedTab);
    return printedTab;
}  

const TabImportSection = (props) => {
    const [tabInfo, setTabInfo] = useState({}); //sorry redux
    const [tabURL, setTabURL] = useState('');

    const requestTab = async () => {
        try {
            const t = await fetch('/tabs/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ URL: tabURL })
            }); 
            console.log('response: ', t)
            const rStream = await t.text()
            const parsedStream = JSON.parse(rStream);
            setTabInfo(parsedStream);
        } catch (err) {
            console.log('error occured while requesting tab info:', err)
        }
    }

    const handleURLchange = (e) => {
        const URL = e.target.value;
        setTabURL(URL);
    }

    const tabDisplay = (
        <div>
            <h4> Get a tab from online </h4>
            <input size='30' placeholder='Enter an ultimate-guitar.com URL' onChange={handleURLchange}/>
            <t/> <button onClick={requestTab}> Get Tab </button>
            <hr/> <br/>
            <p> 
                <b> {tabInfo.songName} </b> by {tabInfo.artistName}
                <br/> <br/>
                {parseGuitarTab(tabInfo.tab).split('\n').map((str, i) => (
                    <React.Fragment key={i}>
                        {str} 
                        <br/>
                    </React.Fragment>
                ))} 
            </p>
        </div>
    )

    return(
        <div className='tab'> {tabDisplay}</div>
    )
}

export default TabImportSection;