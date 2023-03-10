import requests

url = "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerList"

headers = {
    "X-RapidAPI-Key": "c88e90764amsh5950fc32a13ed4fp14576ajsn0ae19e700358",
    "X-RapidAPI-Host": "tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com",
}

response = requests.request("GET", url, headers=headers)

print(response.text)
