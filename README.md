# tabHelper by Thomas Hales

A Javascript Web App in which you can write tabs and save them to a database, powered by React, Express, RTK, and Mongoose/MongoDB.

Guitar tabs can be quickly saved and accessed for quick writing and viewing.


## Upcoming features:
Editor:
        --prevent the saving of a tab with a blank name/artist
        --renaming for tabs owned by the user
    
    -tabs from scratch have hardcoded author property 'user'

Import:
        --prevent the population of past search results (and the back button) when search type is changed after importing a tab
        --filtering by rating, type, and difficulty
        --confirmation upon adding to songbook

    -the tab title appears to be totally absent in the data (overwritten by song's name), rating/type/difficulty can help qualify tabs but this would be nice to have (esp on search results page)
    -authors/contributors are sometimes confused in the php page data, but works most of the time

Songbook:
    create + download the book
        --on view, replace the main area with a recreation of the songbook pdf 
            --create a title page (seperate component?)
            --and pages for every tab in the songbook programatically (use PreviewPage.jsx)
                (recreated the layout from at TabImportSection in a modularized component, now PreviewPage.jsx)
                (debug here)
                --better placement for page buttons? (bottom corners?)
        --pdf creation and downloading with the other button

Spotify:
    top artists/songs --> 

--deal with all errors in the log / remove clgs
remove all logs / style

- Users and authentication
- Streamlined UI
- Tab-specific annotations
- Docker/AWS deployment


