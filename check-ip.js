// Validation tool for IP addresses

var ipRangeCheck = require("ip-range-check");

var validRegEx = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


// Bogons list from http://www.team-cymru.org/bogon-reference.html
var bogonsArray = [ "0.0.0.0/8","10.0.0.0/8","100.64.0.0/10","127.0.0.0/8","169.254.0.0/16",
    "172.16.0.0/12","192.0.0.0/24","192.0.2.0/24","192.168.0.0/16","198.18.0.0/15",
    "198.51.100.0/24","203.0.113.0/24","224.0.0.0/3" ];

// Private IP list.  Common RFC1918 IP addresses from https://tools.ietf.org/html/rfc1918
var privateIpArray = [ "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16" ];


function checkIp(ip){
    // Set originalIp and reset other properties of answer.
    var boiledArray = [];
    var answer = {
        originalIp: ip,
        boiledIp: false,
        isValid: false,
        isBogon: false,
        isApipa: false,
        isMulticast: false,
        isRfc1918: false,
        isPublicIp: false
    };

    // Check to see if it is valid as per RegEx.
    if (validRegEx.test(ip)) {
        answer.isValid = true;

        // Boil off any leading zeros in each octet.
        var octet = ip.split(".");
        for (var i = 0 ; i < 4 ; i++ ){
            boiledArray.push(parseInt(octet[i], 10));
        }
        answer.boiledIp = boiledArray.join(".");

        // Check to see if it is on the bogons list.
        if (ipRangeCheck(answer.boiledIp, bogonsArray)){
            answer.isBogon = true;
        }
        // Check to see if IP address is an Automatic Private IP Addressing (APIPA aka auto-IP) IP.
        if (ipRangeCheck(answer.boiledIp, "169.254.0.0/16")){
            answer.isApipa = true;
        }
        // Check to see if the IP address is a Multicast IP.
        if (ipRangeCheck(answer.boiledIp, "224.0.0.0/4")){
            answer.isMulticast = true;
        }
        // Check to see if it is a public IP or private IP (RFC 1918).
        if (ipRangeCheck(answer.boiledIp, privateIpArray)) {
            answer.isRfc1918 = true;
        } else if (answer.isBogon === false) {
            answer.isPublicIp = true;
        }
    }
    return answer;
}

module.exports = checkIp;
