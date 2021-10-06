module.exports = (req, res, next) => {
  const { text, completed } = req.body;

  if (text && typeof text !== 'string') {
    res.status(400).json({ message: "invalid 'text' expected string" });
    return;
  }

  if (text === '') {
    res.status(400).json({ message: "'text' cannot be empty" });
    return;
  }

  if (completed && typeof completed !== 'boolean') {
    res.status(400).json({ message: "invalid 'completed' expected boolean" });
    return;
  }

  next();
}