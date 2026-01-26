import os
from playwright.sync_api import sync_playwright

def verify_process_section():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to the local server
            page.goto("http://localhost:5173")

            # Wait for the process section to be visible
            page.wait_for_selector("#process")

            # Scroll to the process section
            process_section = page.locator("#process")
            process_section.scroll_into_view_if_needed()

            # Wait a bit for animations to start/settle (the orbital animation)
            page.wait_for_timeout(2000)

            # Ensure the directory exists
            os.makedirs("/home/jules/verification", exist_ok=True)

            # Take a screenshot of the process section
            process_section.screenshot(path="/home/jules/verification/process_section.png")
            print("Screenshot saved to /home/jules/verification/process_section.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_process_section()
