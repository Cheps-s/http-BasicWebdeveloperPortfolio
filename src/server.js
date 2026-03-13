app.get('/api/profile', (req, res) => {
  res.json({
    name: "Andrei Nyl Manliclic",
    title: "Full Stack Developer",
    bio: "Building modern web experiences with clean design."
  });
});