# Animated Letters Setup Guide

## 📁 File Organization

All letter videos should be placed in: **`public/letters/`**

### Naming Convention
- Each file should be named: `[LETTER].mp4`
- Use **UPPERCASE** letters
- Example: `A.mp4`, `B.mp4`, `C.mp4`

### Required Letters for "VISIONARY DIRECTOR"
```
public/letters/
├── A.mp4
├── C.mp4
├── D.mp4
├── E.mp4  ✅ Already uploaded
├── I.mp4
├── N.mp4
├── O.mp4
├── R.mp4
├── S.mp4
├── T.mp4
├── V.mp4
└── Y.mp4
```

---

## 🎨 Sizing & Customization

### Quick Size Presets

```tsx
import { VisionaryDirectorLogo } from "@/components/visionary-director-logo"

// Small (navbar, footer)
<VisionaryDirectorLogo size="sm" />

// Medium (section headers)
<VisionaryDirectorLogo size="md" />

// Large (hero sections) - DEFAULT
<VisionaryDirectorLogo size="lg" />

// Extra Large (landing page hero)
<VisionaryDirectorLogo size="xl" />
```

### Custom Sizing

```tsx
// Use any Tailwind classes
<VisionaryDirectorLogo 
  size="custom"
  className="h-20 md:h-32 lg:h-48"
/>
```

### Animation Speed

```tsx
// Faster animation (30ms between letters)
<VisionaryDirectorLogo letterDelay={30} />

// Slower, dramatic animation (150ms between letters)
<VisionaryDirectorLogo letterDelay={150} />

// Default is 50ms
```

### Layout Options

```tsx
// Stack on mobile, side-by-side on desktop (DEFAULT)
<VisionaryDirectorLogo stackOnMobile={true} />

// Always side-by-side
<VisionaryDirectorLogo stackOnMobile={false} />
```

---

## 🎬 Video Requirements

### Recommended Specs
- **Format:** MP4 (H.264)
- **Resolution:** 1080p or 4K (we'll scale down)
- **Background:** Transparent or black
- **Duration:** 1-3 seconds (will loop)
- **File Size:** < 5MB per letter (optimized)

### Optimization Tips
1. **Compress videos** before uploading (use HandBrake or similar)
2. **Use transparent backgrounds** if possible (WebM with alpha)
3. **Keep animations short** (1-2 seconds) for fast loading
4. **Test on mobile** - videos should look good at small sizes

---

## 🚀 Usage Examples

### Hero Section (Waitlist Page)
```tsx
import { VisionaryDirectorLogoHero } from "@/components/visionary-director-logo"

<div className="min-h-screen flex items-center justify-center">
  <VisionaryDirectorLogoHero />
</div>
```

### Navbar Logo
```tsx
import { VisionaryDirectorLogoCompact } from "@/components/visionary-director-logo"

<nav>
  <VisionaryDirectorLogoCompact />
</nav>
```

### Custom Implementation
```tsx
<VisionaryDirectorLogo 
  size="xl"
  letterDelay={100}
  stackOnMobile={true}
  className="h-48 md:h-64 lg:h-80"
/>
```

---

## 🎨 Styling Control

### Individual Letter Control
Edit `components/animated-letter.tsx` to customize:
- Fallback colors when video doesn't load
- Video playback settings (loop, autoplay)
- Loading states
- Hover effects

### Logo Container Control
Edit `components/visionary-director-logo.tsx` to customize:
- Spacing between letters (`gap-1`, `gap-2`, etc.)
- Spacing between words (`gap-4 md:gap-6`)
- Alignment and layout
- Responsive breakpoints

---

## 🔧 Troubleshooting

### Videos Not Playing?
1. Check files are in `public/letters/`
2. Verify filenames are uppercase + `.mp4`
3. Check browser console for errors
4. Ensure videos are properly encoded

### Performance Issues?
1. Compress videos (target < 2MB per letter)
2. Use lazy loading for letters below the fold
3. Consider WebP or WebM format
4. Test on mobile devices

### Layout Issues?
1. Adjust `gap` classes in logo component
2. Use responsive height classes (`h-12 md:h-24`)
3. Test different screen sizes
4. Adjust `stackOnMobile` prop

---

## 📊 File Size Targets

| Use Case | Target Size | Max Size |
|----------|-------------|----------|
| Hero (XL) | 2-3 MB | 5 MB |
| Section (LG) | 1-2 MB | 3 MB |
| Navbar (SM) | 500 KB | 1 MB |

**Total for all 12 letters:** ~15-25 MB (acceptable for hero element)

---

## 🎯 Next Steps

1. ✅ Place all letter videos in `public/letters/`
2. ✅ Name them correctly (uppercase letter + .mp4)
3. ✅ Test the logo on waitlist page
4. ✅ Adjust sizing with the presets
5. ✅ Fine-tune animation speed
6. ✅ Optimize videos if loading is slow

---

## 💡 Advanced Options

### Add Glow Effect
```tsx
<div className="[&_video]:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
  <VisionaryDirectorLogo size="xl" />
</div>
```

### Add Hover Interaction
```tsx
<div className="transition-transform hover:scale-105">
  <VisionaryDirectorLogo size="lg" />
</div>
```

### Add Background Blur
```tsx
<div className="backdrop-blur-xl bg-black/30 p-8 rounded-3xl">
  <VisionaryDirectorLogo size="xl" />
</div>
```

---

Need help? Check the component files:
- `components/animated-letter.tsx` - Individual letter handling
- `components/visionary-director-logo.tsx` - Full logo component







