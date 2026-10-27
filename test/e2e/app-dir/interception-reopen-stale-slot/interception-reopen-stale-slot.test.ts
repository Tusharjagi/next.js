import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

describe('interception-reopen-stale-slot', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should reopen an intercepted route after navigating away from it', async () => {
    const browser = await next.browser('/')

    // Open the intercepted modal.
    await browser.elementById('open-search').click()
    await retry(async () => {
      expect(await browser.url()).toEndWith('/search')
      expect(await browser.hasElementByCssSelector('#search-modal')).toBe(true)
    })

    // Navigate to a URL with no matching @modal route. The slot keeps the
    // (.)search segment around as a stale, inactive segment.
    await browser.elementById('result-link').click()
    await retry(async () => {
      expect(await browser.url()).toEndWith('/items/1')
      expect(await browser.elementById('children').text()).toBe('Item 1')
      expect(await browser.hasElementByCssSelector('#search-modal')).toBe(false)
    })

    // Reopening the modal re-activates the stale slot. This used to be
    // silently dropped: the server skipped the slot as if it were current.
    await browser.elementById('open-search').click()
    await retry(async () => {
      expect(await browser.url()).toEndWith('/search')
      expect(await browser.hasElementByCssSelector('#search-modal')).toBe(true)
      expect(await browser.elementById('children').text()).toBe('Item 1')
    })
  })

  it('should reopen an intercepted route repeatedly', async () => {
    const browser = await next.browser('/')

    for (let i = 0; i < 3; i++) {
      await browser.elementById('open-search').click()
      await retry(async () => {
        expect(await browser.url()).toEndWith('/search')
        expect(await browser.hasElementByCssSelector('#search-modal')).toBe(
          true
        )
      })

      await browser.elementById('result-link').click()
      await retry(async () => {
        expect(await browser.url()).toEndWith('/items/1')
        expect(await browser.hasElementByCssSelector('#search-modal')).toBe(
          false
        )
      })
    }
  })
})
