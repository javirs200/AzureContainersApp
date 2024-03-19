import requests
import json

def doRequest():
    url = 'https://timerwrc.azurewebsites.net/test'
    datar = {
            "tabla": [
                {
                    "name": "pi",
                    "tramo1": "01:25.351",
                    "tramo2": "02:34.234"
                },
                {
                    "name": "pi2",
                    "tramo1": "01:25.351",
                    "tramo2": "02:34.234"
                }
        ]
        }
    datajs = json.dumps(datar)
    x = requests.post(url,headers={"Content-Type": "application/json"},data=datajs)
    return("response : " + x.text)


