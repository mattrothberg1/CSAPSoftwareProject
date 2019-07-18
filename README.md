# CSAPSoftwareProject
Created by Matt Rothberg, Nicole Porten, Mason Lee, and Jimmie Stuckly 
Please email mrothber@cisco.com to report bugs or ask questions 

This program will populate a table across multiple networks and organizations associated with a Meraki API key. You can quickly assign policy to individual clients with the default Meraki policies (Allowed/Blocked) or can assign custom group policy that was previously created on the Meraki website. Each client will display the available group policies specific to the network that the client is on. You can then enter the policy ID number into the field and apply that policy. 

This project is open source and may be altered, edited, and distributed at will. The main files to be aware of are: 
"client-list.component.ts" - This is the file that populates the table and contains the main functions 
"merakiAPI.js" - The functions inside this file are called upon inside "client-list.component.ts" and make the REST API calls to Meraki