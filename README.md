# Template for fullstack app with NestJs and React

## Setup

### React

The react app is created with vite. It uses tailwindcss for styling and framer-motion for animations.

List of packages:

- [Tanstack Query](https://tanstack.com/query/v3/) for data fetching
- [React Hook Form](https://react-hook-form.com/) for form handling
- [React Router](https://reactrouter.com/) for routing
- [Lucide Icons](https://lucide.dev/) for icons
- [React Hot Toast](https://react-hot-toast.com/) for toasts
- [Zod](https://zod.dev) for validation
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tainlwind Variants](https://www.tailwind-variants.org/) for tailwind variants
- [Axios](https://axios-http.com/) for http requests
- [Vite](https://vitejs.dev/) for bundling

#### A snippet for creating styled components:

```json
"Creates a Motion Ref Tailwind Component": {
  "prefix": "mrtc",
  "body": [
    "import { forwardRef } from 'react';",
    "",
    "import { motion } from 'framer-motion';",
    "import { tv, VariantProps } from 'tailwind-variants';",
    "",
    "const ${1:component} = tv({});",
    "",
    "export interface ${2:Component}Props",
    "  extends React.ComponentProps<typeof motion.${3:div}>,",
    "    VariantProps<typeof ${1}> {}",
    "",
    "const ${2} = forwardRef<React.ElementRef<typeof motion.${3}>, ${2}Props>(function _${2}(",
    "  { className, ...props },",
    "  ref,",
    ") {",
    "  return <motion.${3} className={${1}({ className })} {...props} ref={ref} />;",
    "});",
    "",
    "export default ${2};",
    ""
  ],
  "description": "Creates a Motion Ref Tailwind Component"
}
```

## Configuring Environment Variables

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Smtp
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM=<Fullstack Template>
SMTP_SECURE=false # or true if you are using ssl, than you need to set SMTP_USER and SMTP_PASSWORD

# JWT (you can generate it with 'node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"')
JWT_ACCESS_TOKEN_SECRET=
JWT_REFRESH_TOKEN_SECRET=
JWT_PASSWORD_RECOVERY_TOKEN_SECRET=
JWT_ACCOUNT_CONFIRMATION_TOKEN_SECRET=
```