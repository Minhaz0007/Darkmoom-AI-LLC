from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Landing Page
        print("Navigating to Landing Page...")
        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        # Scroll to find the Featured Case Study section
        # It has text "Featured Case Study"
        featured_section = page.get_by_text("Featured Case Study")
        try:
            if featured_section.count() > 0:
                print("Found Featured Case Study section")
                featured_section.first.scroll_into_view_if_needed()
                page.wait_for_timeout(1000) # Wait for animation/reveal
                page.screenshot(path="verification/landing_page_featured.png")
            else:
                print("Featured Case Study section NOT found!")
                page.screenshot(path="verification/landing_page_fail.png")
        except Exception as e:
            print(f"Error finding featured section: {e}")

        # 2. Navigate to Case Study
        print("Clicking Read Case Study link...")
        # Use get_by_role link with text "Read Case Study"
        link = page.get_by_role("link", name="Read Case Study")
        if link.count() > 0:
            link.first.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(2000) # Wait for initial animations

            # 3. Case Study Page
            print("Taking screenshots of Case Study page...")
            page.screenshot(path="verification/case_study_hero.png")

            # Scroll down to Transformation
            page.evaluate("window.scrollBy(0, 800)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/case_study_transformation.png")

            # Scroll to Dashboard
            dashboard = page.get_by_text("Interactive Power BI Dashboard")
            if dashboard.count() > 0:
                dashboard.first.scroll_into_view_if_needed()
                page.wait_for_timeout(1000)
                page.screenshot(path="verification/case_study_dashboard.png")

                # Test Tab Switching (if I can script it easily)
                try:
                    page.get_by_role("button", name="Energy & Emissions").click()
                    page.wait_for_timeout(1000)
                    page.screenshot(path="verification/case_study_dashboard_energy.png")
                except Exception as e:
                    print(f"Error clicking tab: {e}")

            # Scroll to Impact
            try:
                impact = page.get_by_text("Business Impact")
                if impact.count() > 0:
                    impact.first.scroll_into_view_if_needed()
                    page.wait_for_timeout(1000)
                    page.screenshot(path="verification/case_study_impact.png")
            except Exception as e:
                print(f"Error finding Impact section: {e}")

        else:
             print("Link 'Read Case Study' NOT found!")

        browser.close()

if __name__ == "__main__":
    run()
