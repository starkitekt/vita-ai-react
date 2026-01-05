---
description: Auto-commit and deploy changes to Vercel after edits
---

# Auto-Deploy Workflow

After completing any file edits, automatically commit and deploy to Vercel.

## Steps

// turbo-all

1. Stage all changes:
```bash
git add .
```

2. Commit with descriptive message:
```bash
git commit -m "Brief description of changes"
```

3. Deploy to Vercel production:
```bash
npx vercel --prod --yes
```

## Notes
- The site is deployed at: https://vitac.vercel.app
- All commands run from: `c:\Users\abhis\Downloads\Vita AI\wireframe`
- Always use descriptive commit messages summarizing the changes made
