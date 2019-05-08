# auto-open-deep-link-url
A Chrome extension which understands the content on the clipboard, automatically weaves a deep linked URL and navigates to it on the newly opened tab. 

Examples:

* **Deep linked URLs:** If the content on the clipboard matches a defined pattern set (RegEx or an array item), then opening a new tab will automatically navigate to the desired page.
``` http://www.myintranetsite/allapp/ { ** places clipboard content here ** } /details ```

![Demo 1](https://raw.githubusercontent.com/takrishna/auto-open-deep-link-url/master/3_demo.gif)

* **Service now "Change Number":** If a "Service Now Change number" is copied on to the clipboard, then opening a new tab will automatically navigate to the "Service Now Change Request" page. Similarly one can configure Service now (SNOW) incidents, requests etc.

![Demo 2](https://raw.githubusercontent.com/takrishna/auto-open-deep-link-url/master/3_demo.gif)

* **BMC Helix ITSM (Remedy) "Incident":** If a "Helix Incident Number" (Remedy Incident) is copied on to the clipboard, then opening a new tab will automatically navigate to the "Helix Incident" page. Similarly one can configure Remedy Changes, requests etc.

![Demo 2](https://raw.githubusercontent.com/takrishna/auto-open-deep-link-url/master/3_demo.gif)

* **Automatically open URLs:** If a URL is copied on to the clipboard, then opening a new tab will automatically navigate to the copied URL 

![Demo 3](https://raw.githubusercontent.com/takrishna/auto-open-deep-link-url/master/3_demo.gif)
