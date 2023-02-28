from datetime import date
import datetime, time
import sys, json, os, string
import requests

# important file paths
SCRAPE_DIR_PATH = "./"
SCRAPE_DIR_NAME = "data/Team-Info"
SCRIPT_PATH = os.path.realpath(os.path.dirname(__file__))

# JSON file paths
JSON_INDENT = 4
CALL_ATTEMPTS = 3

# RESTAURANTS_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Restaurants.json"
# CULTURES_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Cultures.json"
# RECIPES_JSON_PATH = SCRAPE_DIR_PATH + SCRAPE_DIR_NAME + "/Recipes.json"



def create_json_file(file_path, default_data = {}):
    """
    creates a json file with a list at the specified path if it does not exist
    """
    file_exists = os.path.exists(file_path)
    print(file_exists)
    with open(file_path, 'w') as file:
        json.dump(default_data, file, indent = JSON_INDENT)
