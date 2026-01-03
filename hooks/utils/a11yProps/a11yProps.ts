export const a11yProps = (index: number) => {
  return {
    accessibilityRole: "tab" as const,
    accessibilityLabel: `Tab ${index}`,
    accessibilityHint: `Activate to switch to tab ${index}`,
  }
}
