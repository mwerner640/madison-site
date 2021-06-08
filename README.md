#### Todo
+ Ask Madison what favicon to use
+ See best optimization for styles

#### Technology Overview
As this is a minimalistic website, I tried to make the code as elegant as possible by striving for greatest efficiency while using the simplest technology to get the job done. Thus, the entire site is written in vanilla HTML and plain JavaScript, with zero external dependencies.

#### Creating the Site
+ `cp ./public/* <your_site_root>`
+ Make sure the site has proper permissions...
    + `chmod -R a+r ./*`
    + `chmod -R a+x assets assets/images assets/scripts assets/styles EXHIBITIONS/`

#### Uploading
+ Place image in `assets/images/`
    + Example: `scp ./my-image user@server.tld:/path/to/site/assets/images/`
+ Add information to [images.json](images.json)
+ Template: 
    {
        "src": "",
        "title": "",
        "dimensions": "",
        "medium": "",
        "year":
    }

