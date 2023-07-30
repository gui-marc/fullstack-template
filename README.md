# Template for fullstack app with NestJs and React

## Snippets

### React

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