import os
import time
from playwright.sync_api import sync_playwright

def check_mobile_view():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Define mobile devices to test
        devices = [
            {'name': 'iPhone 12', 'width': 390, 'height': 844},
            {'name': 'Pixel 5', 'width': 393, 'height': 851},
            {'name': 'iPad Mini', 'width': 768, 'height': 1024} # Tablet
        ]

        os.makedirs("/home/jules/verification/mobile", exist_ok=True)

        for device in devices:
            print(f"Testing {device['name']}...")
            context = browser.new_context(
                viewport={'width': device['width'], 'height': device['height']},
                user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
            )
            page = context.new_page()

            try:
                page.goto("http://localhost:3001")

                # Wait for initial load
                page.wait_for_load_state('networkidle')
                time.sleep(2) # Extra wait for animations

                # Take full page screenshot
                page.screenshot(path=f"/home/jules/verification/mobile/{device['name'].replace(' ', '_')}_full.png", full_page=True)

                # Screenshot specific sections if needed
                # Hero
                page.locator("#home").screenshot(path=f"/home/jules/verification/mobile/{device['name'].replace(' ', '_')}_hero.png")

                # Process
                page.locator("#process").scroll_into_view_if_needed()
                time.sleep(1)
                page.locator("#process").screenshot(path=f"/home/jules/verification/mobile/{device['name'].replace(' ', '_')}_process.png")

                # Navbar mobile menu check
                # Scroll back to top
                page.evaluate("window.scrollTo(0, 0)")
                time.sleep(1)

                # Click menu button
                menu_btn = page.locator('button[aria-label="Toggle mobile menu"]')
                if menu_btn.is_visible():
                    menu_btn.click()
                    time.sleep(1)
                    page.screenshot(path=f"/home/jules/verification/mobile/{device['name'].replace(' ', '_')}_menu.png")

            except Exception as e:
                print(f"Error testing {device['name']}: {e}")
            finally:
                context.close()

        browser.close()

if __name__ == "__main__":
    check_mobile_view()
