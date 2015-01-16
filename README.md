# javascript_kmom07
The project assigment of the JavaScript course at BTH university

## Description 
This is a Firefox add-on that filters images in web pages. It can be used as a simple adblocker. It filter the images with regular expression that matches part of the url in the img src attribute. The filtering is done after the page is fully loaded so this is not a way to save bandwidth.

##Installation 
1. Download the kmom10.xpi file. 
2. Open Firefox and go to *Tools -> Add-ons*. 
3. Click on the gear icon, select *Install Add-on from File...* 
4. Locate and select the xpi file in the file dialog. 
5. A confirmation dialog is shown. Click the *Install now* button. 

##Usage
The add-on installs a button in the Firefox gui. Clicking this button will open a dialog where filters for images source can be edited. These are given as JavaScript regexes. By clicking the *OK* button the dialog is closed and the filters saved. These filters are then applied on all new page loads. If the filter is part of a domain all images from domains that match the filter is blocked. It is also possible to block images on file name or extension, i.e. jpg will block all jpg images from all sites. 



