# tabHelper by Thomas Hales

A Javascript Web App in which you can write tabs and save them to a database, powered by React, Express, RTK, and Mongoose/MongoDB.

Guitar tabs can be quickly saved and accessed for quick writing and viewing.


## Upcoming features:
Editor:
        --renaming for tabs owned by the user, and no (edited)
            --ive typed the tabs (original, import-edited and import-unedited)
    
    -tabs from scratch have hardcoded author property 'user'

Import:
    importing by artist / via a request to the search page and a concurrent request to the selected link
        --filtering by rating, type, and difficulty
        --deal with all errors in the log / remove clgs

    -the tab title appears to be totally absent in the data (overwritten by song's name), rating/type/difficulty can help qualify tabs but this would be nice to have (esp on search results page)
    -authors/contributors are sometimes confused in the php page data, but works most of the time

Songbook:
    more info on song cards?
    create + download the book

Spotify:
    top artists/songs --> 

remove all logs / style

- Users and authentication
- Streamlined UI
- Tab-specific annotations
- Docker/AWS deployment


