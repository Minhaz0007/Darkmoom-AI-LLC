from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:3001/portfolio/refinery-dashboard")

        # Wait for the scenario section to be visible
        page.wait_for_selector(".scenario-section")

        # Take a screenshot of the entire page or specific sections
        # I'll take a full page screenshot to see everything
        page.screenshot(path="verification_refinery_full.png", full_page=True)

        # Take a specific screenshot of the scenario section
        scenario = page.locator(".scenario-section")
        scenario.screenshot(path="verification_refinery_scenario.png")

        # Take a specific screenshot of the impact section
        impact = page.locator(".impact-grid")
        impact.screenshot(path="verification_refinery_impact.png")

        browser.close()

if __name__ == "__main__":
    run()
