app.get('/api/profile', (req, res) => {
  res.json({
    name: "Andrei Nyl Manliclic",
    title: "FrontEnd Developer",
    bio: "Passionate about crafting engaging web experiences with a focus on frontend development, design tools, and modern web technologies. With 3+ years of experience, I specialize in creating visually stunning and user-friendly websites that blend creativity with functionality. Always eager to learn and explore new technologies to stay at the forefront of web development trends.",
  });
});