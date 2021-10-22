## How to debug
In order to debug you have to run a local web server with https 

To create a SSL certificate for localhost run the following commands:

```
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

openssl rsa -in keytmp.pem -out key.pem       
```

## Create a DEV Package
Run the following command to create a dev package:

`npx tfx-cli extension create --manifest-globs vss-extension.json --overrides-file vss-extension.dev.json --rev-version`

## Scopes
Needed in order to make the api request
https://docs.microsoft.com/en-us/azure/devops/extend/develop/manifest?view=azure-devops#scopes
