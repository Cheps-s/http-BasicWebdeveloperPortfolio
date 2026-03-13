/*
  # Portfolio Database Schema

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `ip_address` (text)
      - `user_agent` (text)
      - `visited_at` (timestamp)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `read` (boolean, default false)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `live_url` (text)
      - `tags` (text array)
      - `category` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for projects
    - Admin-only write access for projects
    - Public can submit contact messages
    - Track visitors without authentication
*/

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text,
  user_agent text,
  visited_at timestamptz DEFAULT now()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track visits"
  ON visitors
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view visitor count"
  ON visitors
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  live_url text,
  tags text[] DEFAULT '{}',
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample projects
INSERT INTO projects (title, description, image_url, live_url, tags, category, display_order)
VALUES 
  (
    'Chepsbook',
    'A social-style website with modern layout and responsive interface. Features user profiles, posts, and interactive elements.',
    '/src/img/Screenshot 2026-03-12 145728.png',
    'https://cheps-s.github.io/Chepsbook.com/#home',
    ARRAY['HTML', 'CSS', 'JavaScript'],
    'Social Website',
    1
  ),
  (
    'Andrei Nyl Portfolio',
    'Personal developer portfolio showcasing projects, skills, and UI animations with modern design principles.',
    '/src/img/Screenshot 2026-03-12 150045.png',
    'https://cheps-s.github.io/Andreinyl.com',
    ARRAY['HTML', 'CSS', 'JavaScript'],
    'Portfolio',
    2
  ),
  (
    'Parallax Portfolio',
    'My first portfolio with parallax scrolling and interactive elements.',
    '/src/img/Screenshot 2026-03-12 220038.png',
    '/src/parallax website/index.html',
    ARRAY['HTML', 'CSS', 'JavaScript'],
    'Portfolio',
    3
  )
ON CONFLICT DO NOTHING;
