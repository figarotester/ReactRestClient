# SAMPLES  REQUESTS

## SAMPLE GET #1
* METHOD: GET 
* URL: https://test.figaro-spc.fe-spectrum.net/core/healthcheck
* REQUEST HEADERS:
    Accept: application/json
    Content-Type: application/json
* EXPECTED RESPONSE BODY:
```
{
    "message": "up and running! Docs at https://oasis.figaro.spectrumtoolbox.com/oasis",
    "spcProxyHost": "www.portals.dev-spectrum.net",
    "tdcsProxyHost": "pi.engprod-spectrum.net",
    "careProxyHost": "careapi-qa.brighthouse.com",
    "PCIProxyHost": "pcidev.dev-spectrum.net",
    "PIProxyHost": "pi.dev-spectrum.net",
    "WiFiProxyHost": "wifiprofile.spectrum.net",
    "ConcurrentUserSessions": "16",
    "NodeVersion": "v12.18.2"
}
```

## SAMPLE POST #1
* METHOD: POST 
* URL: https://test.figaro-spc.fe-spectrum.net/api/pub/authn/v1/authenticate
* REQUEST HEADERS:
    Accept:application/json
    Content-Type:application/json
    xc-portal-source-client: MySpectrumApp@8.4.0
    Authorization:Basic Y2hhcnRlcm5ldDpDaGFydDNybjN0
* REQUEST BODY:   
```
{
  "KeepMeIn": true,
  "Username": "billpay0026?recordsession=true&uriexactmatch=false",
  "TargetUrl": null,
  "Password": "Testing01",
  "CaptchaResponse": null,
  "AttemptNumber": 1
}
```
* SOME OF THE EXPECTED RESPONSE HEADERS:
```
Content-Type:application/json;charset=utf-8
X-Figaro-Spc-Mock-Response:FALSE
X-Figaro-Spc-Proxy-Time:884 ms
Content-Length:643
```
* EXPECTED RESPONSE BODY:
```
{
    "Status": "SUCCESS",
    "Username": "billpay0026@charter.net",
    "PartnerType": "CHARTER",
    "AttemptNumber": 1,
    "LCharterSession": {
        "SessionId": "Jd43gFRYU4XujjCILxaMwA1pTHuovXAXmAwCu11eIrE@4-oauK8CB2GK0IxjRCcbKA@FFCeOIOr9wg9sm0YPDwDClMe3retxKxi9kJIG8-0xEYX6-eYniGfcxhEBG0ihdZNX1aJZRGqyuBLRlAfAGSeRHVJviUwVwgXB5X7jTkKYcS_BnLKBG5_AXktBu9IiffX69cKIoTFqPDYeY75JR3vJ0DwP6e6JK8oGRddD9gm1lXGj_CE6CDt7mI3bEKLz6LsR-pZahrnZT6lfkCcgj56Dzcu6TcDfbq8xKooTdtpwpd30mTTG6HbC0puPsOwxqwIyV2tMiYvYPpU0oMtuYXnjem9Ygol0vADmVWls7JnSpdPh0Mg5qTYnXEwK-Qb3JxiWLrMfhwqSDv7nhmSxAoOHK1iMZTjp7CJ9X13AtBL_rg",
        "EncryptedSessionId": "*",
        "PKey": "*",
        "KeepMeIn": true
    },
    "optinStatus": "AUTO_OPTIN",
    "consolidatedStatus": "CONSOLIDATED",
    "optinDueDate": "2019-09-18",
    "forceLegacy": false,
    "AccountType": "RESIDENTIAL",
    "txnId": "4644155523096122",
    "timestamp": "2020-07-07T19:11:19.945Z"
}
```
