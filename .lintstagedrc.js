module.exports = {
  "*.{js,jsx,ts,tsx}": () => "yarn lint",
  "*.{ts,tsx}": () => "yarn check-types"
}
