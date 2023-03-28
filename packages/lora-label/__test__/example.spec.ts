const fn = () => {
  return 'hello'
}
test('hello', () => {
  expect(fn()).toBe('hello')
})
