# tabHelper by Thomas Hales

A Javascript Web App in which you can write tabs and save them to a database, powered by React, Express, RTK, and Mongoose/MongoDB.

Guitar tabs can be quickly saved and accessed for quick writing and viewing.


## Upcoming features:
Editor:
    option to extend the editor / add more tab (fit editor to screen?)
    fix the editing of a tab in the state/reducers (changeCurrentTab)
    save should add to songbook
    song title should include tab author and user

Import:
    importing by artist / via a request to the search page and a concurrent request to the selected link
        --filtering by rating, type, and difficulty
        --deal with all errors in the log / remove clgs

        -the tab title appears to be totally absent in the data (overwritten by song's name), rating/type/difficulty can help qualify tabs but this would be nice to have (esp on search results page)
        -authors/contributors are sometimes confused in the php page data, but works most of the time

Songbook:
    create + download the book

Spotify:
    top artists/songs --> 

remove all logs / style

- Users and authentication
- Streamlined UI
- Tab-specific annotations
- Docker/AWS deployment


