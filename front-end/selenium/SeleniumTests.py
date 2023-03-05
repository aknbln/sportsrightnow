# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import sys


class TestColors:
    OK = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    RESET = '\033[0m'


class SeleniumTests:
    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_about(self):
        self.driver.get("https://www.sportsrightnow.me/")
        self.driver.find_element(By.LINK_TEXT, "About").click()

        team_header = self.driver.find_element(By.CSS_SELECTOR, ".container:nth-child(1) > h2")
        driver.execute_script("arguments[0].scrollIntoView();", team_header)
        WebDriverWait(driver, 5).until(expected_conditions.visibility_of(team_header))
        assert team_header.text == "Our Team"

        tech_header = self.driver.find_element(By.CSS_SELECTOR, ".container:nth-child(2) > h2")
        driver.execute_script("arguments[0].scrollIntoView();", tech_header)
        WebDriverWait(driver, 5).until(expected_conditions.visibility_of(tech_header))
        assert tech_header.text == "Technologies Utilized"

        api_header = self.driver.find_element(By.CSS_SELECTOR, ".container:nth-child(3) > h2")
        self.driver.execute_script("arguments[0].scrollIntoView();", api_header)
        WebDriverWait(driver, 5).until(expected_conditions.visibility_of(api_header))
        assert api_header.text == "APIs Utilized"

    def test_about_repolink(self):
        self.driver.get("https://www.sportsrightnow.me/")
        self.driver.find_element(By.LINK_TEXT, "About").click()

        link = self.driver.find_element(By.LINK_TEXT, "Repo Link")
        self.driver.execute_script("arguments[0].scrollIntoView();", link)
        WebDriverWait(driver, 5).until(expected_conditions.visibility_of(link))
        link.click()
        url = self.driver.current_url
        assert url == "https://gitlab.com/johannramirez07/cs373-idb-18"

    def test_not_found(self):
        self.driver.get("https://www.sportsrightnow.me/")
        self.driver.get("https://www.sportsrightnow.me/fakepage")
        assert self.driver.find_element(By.CSS_SELECTOR, "h1").text == "404"

    def test_not_found_home(self):
        self.driver.get("https://www.sportsrightnow.me/")
        self.driver.get("https://www.sportsrightnow.me/fakepage")
        assert self.driver.find_element(By.CSS_SELECTOR, "h1").text == "404"
        assert self.driver.find_element(By.LINK_TEXT, "Return Home").text == "Return Home"
        self.driver.find_element(By.LINK_TEXT, "Return Home").click()
        assert self.driver.find_element(By.CSS_SELECTOR, "h2").text == "Sports Now"


# returns 0 if okay, 1 if fail (error counter)
def run_test(test, pass_msg, fail_msg):
    try:
        test()
    except Exception as ex:
        print(TestColors.FAIL + "✘ " + TestColors.RESET + fail_msg)
        print(str(ex))
        return 1
    else:
        print(TestColors.OK + "✔ " + TestColors.RESET + pass_msg)
        return 0


if sys.platform == "win32":
    driver = webdriver.Chrome('./chromedriver-win.exe')
elif sys.platform == "linux":
    pass
    # get linux webdriver
else:
    print("Unsupported OS! Use windows or linux")
    exit(-1)

selenium_tests = SeleniumTests()
selenium_tests.driver = driver

error_count = 0
test_count = 0

test_count += 1
error_count += run_test(selenium_tests.test_not_found, "404 page OK", "404 page not working")

test_count += 1
error_count += run_test(selenium_tests.test_not_found_home, "404 page home link OK", "404 page home link not working")

test_count += 1
error_count += run_test(selenium_tests.test_about, "About page OK", "About page not working")

test_count += 1
error_count += run_test(selenium_tests.test_not_found, "About page repo link OK", "About page repo link not working")

passed = test_count - error_count
print()
print(str(passed) + "/" + str(test_count) + " tests passed!")

if error_count > 0:
    exit(-1)
