export const RMM = {
  domain: 'https://www.wise-paas.com/webresources',
  header: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'AccessToken': 'SGpndWd6VGEvVXVoRVBId0lJUFdSZVhhT2oybzlsZ1dRako2OWd2KzFjd2FENjhBOVhxRThhSmdZaURKbmk3b1lwQTlOUWQxR29KWkFJcm9kcXVnaXc9PQ=='
  }
}

export var restartReq = {
  "request": {
      "item": [{
              "@name": "agentId",
              "@value": ""
          },
          {
              "@name": "action",
              "@value": "Reboot"
          }
      ]
  }
}
