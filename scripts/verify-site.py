import asyncio
import urllib.request
from playwright.async_api import async_playwright

def get_active_url():
    for port in [3000, 3001, 3002, 3003, 3004]:
        url = f"http://localhost:{port}"
        try:
            res = urllib.request.urlopen(url, timeout=2)
            if res.status == 200:
                print(f"Detected active server at {url}")
                return url
        except Exception:
            continue
    return "http://localhost:3000"

async def main():
    target_url = get_active_url()
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Test Desktop (1440x900)
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto(target_url, wait_until="networkidle")
        
        scroll_width = await page.evaluate("document.documentElement.scrollWidth")
        inner_width = await page.evaluate("window.innerWidth")
        print(f"Desktop 1440x900: scrollWidth={scroll_width}, innerWidth={inner_width}")
        assert scroll_width == inner_width, f"Horizontal overflow detected on desktop! ({scroll_width} vs {inner_width})"
        await page.screenshot(path="desktop-1440x900.png", full_page=False)
        
        # Test Mobile (390x844)
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
        await mobile_page.goto(target_url, wait_until="networkidle")
        
        m_scroll_width = await mobile_page.evaluate("document.documentElement.scrollWidth")
        m_inner_width = await mobile_page.evaluate("window.innerWidth")
        print(f"Mobile 390x844: scrollWidth={m_scroll_width}, innerWidth={m_inner_width}")
        assert m_scroll_width == m_inner_width, f"Horizontal overflow detected on mobile! ({m_scroll_width} vs {m_inner_width})"
        await mobile_page.screenshot(path="mobile-390x844.png", full_page=False)
        
        await browser.close()
        print("Verification PASSED with 0 horizontal overflow!")

if __name__ == "__main__":
    asyncio.run(main())
