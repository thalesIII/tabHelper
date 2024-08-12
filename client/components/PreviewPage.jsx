import React from "react";
import { parseGuitarTab } from "../lib/tabParser";

const PreviewPage = ({ previewTab, pageNum, numPages }) => {
    const pageNumSection = (pageNum && numPages) 
        ? <span> Song <b>{pageNum - 1}</b> of {numPages - 1} </span> 
        : <span> </span>;
    const unparseableTabMessage = <p> Sorry, an error occured while retreiving this tab, probably because of an unexpected data format. Please try another tab. </p>;
    
    const AuthorCredits = () => {
        const author = previewTab.author;
    
        if(author === 'user'){
            return(<p> Original tablature created in tabHelper </p>)
        }
    
        const contributors = previewTab.contributors.filter(name => name !== previewTab.author).join(", ");
        
        if(!author && !contributors?.length){ // case 5: nothing found (second clause)
            return(<p> Author not found on <a href={previewTab.url}>ultimate-guitar</a></p>)
        }
    
        if(!author){
            return(<p>Tablature by <i>{contributors}</i> on <a href={previewTab.url}>ultimate-guitar</a></p>)
        }
    
        if(!contributors?.length){
            return(<p>Tablature by <i>{author}</i> on <a href={previewTab.url}>ultimate-guitar</a></p>)
        }
            
        return (
            <p>Tablature by <i>{author}</i> with contributions from <i>{contributors}</i> on <a href={previewTab.url}>ultimate-guitar</a></p>
        )
    }

    const tabSection = (previewTab && previewTab.songName.length)
        ?   (
                <div>
                    {!previewTab?.tab ? unparseableTabMessage : <div>
                        <div className='previewPageHeader'>
                            <span> <b> {previewTab.songName} </b> by {previewTab.artistName} </span>
                            {pageNumSection}
                        </div>
                        <br/>
                        <p> 
                            {parseGuitarTab(previewTab.tab).split('\n').map((str, i) => (
                                <React.Fragment key={i}>
                                    {str} 
                                    <br/>
                                </React.Fragment>
                            ))}
                            <br/> <br/>
                            <AuthorCredits />
                        </p>
                    </div>}
                </div>
        ) : null;
    
        return (
            <div>
                {tabSection}
            </div>
        )
}

export default PreviewPage;