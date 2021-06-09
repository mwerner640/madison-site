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

<3
