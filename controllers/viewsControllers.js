const profile = (req, res) => (
  res.sendFile('../views/profile.html', {
    root: __dirname
  })
)

module.exports = {
  profile,
}