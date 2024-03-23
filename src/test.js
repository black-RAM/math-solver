import { operate } from "."

test("operate can evaluate expressions in the form 'number + number = '", () => {
  expect(operate("1 + 1 = ")).toBe(2)
})