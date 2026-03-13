# React Portfolio with Framer Motion Animations and Supabase Backend

## Overview

Your portfolio has been enhanced with:
- Framer Motion animations throughout the site
- Supabase database backend for visitor tracking, contact forms, and projects
- Custom React hooks for data management
- Reusable animated components
- Real-time visitor counting
- Database-driven project management

## Tech Stack

### Frontend
- React.js with Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for data fetching

### Backend
- Supabase (PostgreSQL database)
- Real-time visitor tracking
- Contact message storage
- Project management system

## Database Schema

### Tables Created

1. **visitors**
   - Tracks unique visits with IP and user agent
   - Public read/write access for tracking

2. **contact_messages**
   - Stores contact form submissions
   - Fields: name, email, message, read status
   - Public write, authenticated read

3. **projects**
   - Manages portfolio projects
   - Fields: title, description, image, URL, tags, category
   - Public read, authenticated write

## Key Features

### Animations

1. **Page Load Animations**
   - Navbar slides down from top
   - Hero content fades in with staggered delays
   - Sections reveal on scroll

2. **Interactive Elements**
   - Buttons scale on hover/tap
   - Cards lift and glow on hover
   - Icons rotate on hover
   - Smooth cursor tracking

3. **Background Effects**
   - Animated gradient orbs in hero
   - Pulsing status indicators
   - Smooth scroll animations

### Custom Hooks

1. **useVisitorTracking()**
   - Automatically tracks page visits
   - Returns visitor count
   - Stores in Supabase

2. **useProjects()**
   - Fetches projects from database
   - Loading states
   - Automatic ordering

### Reusable Components

1. **AnimatedSection**
   - Fade-in animation on scroll
   - Configurable delays

2. **AnimatedProjectCard**
   - Spring animations
   - Hover effects
   - Staggered tag animations

3. **ContactForm**
   - Form validation
   - Success/error states
   - Smooth transitions
   - Direct Supabase integration

## File Structure

```
src/
├── lib/
│   └── supabase.js          # Supabase client
├── hooks/
│   ├── useVisitorTracking.js
│   └── useProjects.js
├── components/
│   ├── AnimatedSection.jsx
│   ├── AnimatedProjectCard.jsx
│   └── ContactForm.jsx
└── App.jsx                   # Main application
```

## Environment Variables

Already configured in `.env`:
```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Animation Examples

### Cursor Animation
```jsx
<motion.div
  animate={{
    left: cursorPos.x - 10,
    top: cursorPos.y - 10,
    scale: mouseDown ? 0.8 : 1
  }}
  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
/>
```

### Card Hover
```jsx
<motion.div
  whileHover={{ y: -10, scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
/>
```

## Database Queries

### Track Visit
```javascript
await supabase.from('visitors').insert({
  ip_address: 'unknown',
  user_agent: navigator.userAgent
})
```

### Submit Contact Form
```javascript
await supabase.from('contact_messages').insert({
  name, email, message
})
```

### Fetch Projects
```javascript
const { data } = await supabase
  .from('projects')
  .select('*')
  .order('display_order', { ascending: true })
```

## Security Features

- Row Level Security (RLS) enabled on all tables
- Public can read projects and visitor count
- Public can submit contact messages
- Authenticated users can manage projects
- Secure API key handling through environment variables

## Performance Optimizations

- Spring animations for smooth physics
- Viewport-based scroll triggers (only animate when visible)
- Lazy loading for project images
- Optimized re-renders with proper dependencies

## Usage

1. Start development server:
```bash
npm run dev
```

2. The application will:
   - Track visitors automatically
   - Load projects from Supabase
   - Display real-time visitor count
   - Handle contact form submissions

## Future Enhancements

You can easily:
- Add authentication for admin panel
- Create project management interface
- View contact messages in admin dashboard
- Add analytics and charts
- Implement search and filtering
- Add project categories

## Notes

- All animations use Framer Motion for consistency
- Database operations use Supabase client
- Form validation prevents empty submissions
- Loading states provide visual feedback
- Error handling with user-friendly messages
