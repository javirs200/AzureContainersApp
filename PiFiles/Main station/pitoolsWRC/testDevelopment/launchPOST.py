import requests
import json

def doRequest0():
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

def doRequest1():
    url = 'https://timerwrc.azurewebsites.net/testpi'
    datar = {
        "stage_name": "croacia",
        "driver_name": "pi",
        "time": "01:25.351"
        }
    datajs = json.dumps(datar)
    x = requests.post(url,headers={"Content-Type": "application/json"},data=datajs)
    return("response : " + x.text)


