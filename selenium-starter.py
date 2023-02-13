# If not already installed...
# Install pip: sudo apt install python3-pip
# Install selenium: pip install selenium
# Install ChromeDriverManager: pip install webdriver-manager (Script not currently using this (11/02/23 but will need to in future, as hardcoding the binary path is deprecated)

# Make sure you've got a compatible version of the browser driver with the version of selenium you're wanting to run. Dont be fooled by the main goto browser you use when checking the version. Your system may not be using default binaries! Name might be different, or binary may not be in default location.

import time
import sys
import os

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
# from webdriver_manager.chrome import ChromeDriverManager

print("Starting script...")

# Ensure we're passing arguments here
if( len(sys.argv) == 1):
    print("No arguments provided")
    sys.exit()
    

file_name = sys.argv[1]
print("File detected: " + file_name)

# Split the filename into a base name and extension
base, ext = os.path.splitext(file_name)
base_filename = base

# Open the file for reading
with open(file_name, "r") as file:
    # Read the contents of the file
    file_contents = file.read()
    print("File contains: " + file_contents)

driver = webdriver.Chrome('./chromedriver') # Initialize the driver (Note, this will be deprecated in future versions of selenium. You'll need to use ChromeDriverManager (see info at top))
driver.get(TARGET_SITE) # Visit the site

# Find all needed elements
name_field = driver.find_element(By.NAME, "title")
password_field = driver.find_element(By.NAME, "passcode")
submit = driver.find_element(By.NAME, "submitter")

# Fill out the form fields
name_field.send_keys(base_filename) # Use the file name to name the set
password_field.send_keys("test")

# Submit the form
submit.click()

time.sleep(3) # Allow time for new page to load
print = driver.find_element(By.CLASS_NAME, "print-button") # Make sure to do this after page has loaded (doesnt exist on previous page)
print.click()
time.sleep(3)


# Close the browser window
#driver.quit()
