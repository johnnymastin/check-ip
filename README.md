check-ip 
========
[![Known Vulnerabilities](https://snyk.io/test/github/johnnymastin/check-ip/badge.svg)](https://snyk.io/test/github/johnnymastin/check-ip)

A simple module that will take an IP address as input and perform the following:
 - Validate the IP address for proper format and number range
 - Remove any leading zeros in each octet 
 - Return a tested ("boiled") IP address
 - Indicate if the IP address is part of the bogons list (https://en.wikipedia.org/wiki/Bogon_filtering)
 - Indicate if the IP address is part of the multicast IP range (https://en.wikipedia.org/wiki/IP_multicast)
 - Indicate if the IP address is an Automatic Private IP Address aka APIPA (http://www.webopedia.com/TERM/A/APIPA.html)
 - Indicate if the IP address is an RFC1918 IP address aka private IP address (https://tools.ietf.org/html/rfc1918)
 - Indicate if the IP address is a public IP address


Install
=======
`npm install check-ip`

Usage
=====
Import the module and give it the IP address to be tested as a parameter:
```javascript
var checkIp = require('check-ip');

checkIp('8.8.8.8');
```
check-ip will return an object similar to the following:
```javascript
{ originalIp: '8.8.8.8',
  boiledIp: '8.8.8.8',
  isValid: true,
  isBogon: false,
  isApipa: false,
  isMulticast: false,
  isRfc1918: false,
  isPublicIp: true }
  ```

You can use any of the properties of the returned object in your code to test for specific use cases.


Methods
=======
- None

Examples
========
Working example of an IP address being tested as a valid public IP address (copy this first code snippet, save in a file and use for testing):
```javascript
var checkIp = require('check-ip');
var ipAddress = '8.8.8.8';

var response = checkIp(ipAddress);
if (response.isValid && response.isPublicIp) {
  console.log("IP address " + response.boiledIp + " is a valid public IP.");
}
```
Example of testing an IP address to make sure it is valid and then using the boiled IP in your code:
```javascript
var checkIp = require('check-ip');
    
// IP address determined to be from a previously defined arguments array elsewhere.
var ip = arg[2];

var response = checkIp(ip);
if (!response.isValid) {
  console.log("Please enter a different IP address.  That one is not valid.");
} else {
  console.log("IP address " + response.boiledIp + " as a valid IP address.");

  // More code goes here to use response.boiledIp in your code.
  {...}

}
```

 Here is example output demonstrating the module 'boiling' the leading zero off of the second octet of the supplied IP address:
```javascript
{ originalIp: '10.020.30.40',
  boiledIp: '10.20.30.40',
  isValid: true,
  isBogon: true,
  isApipa: false,
  isMulticast: false,
  isRfc1918: true,
  isPublicIp: false }
```
Testing
=======
Run automated tests for Node.js:
```
npm run test
```