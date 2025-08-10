# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      | CTRL-C to exit
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## More stuff for me to remember:
- timestamps update on build (Netlify builds tho so)
- get all timestamps (github api) -> timestamps.json (Pkey is file path)
- mark front matter with
    `export const timestamps = true;`
- VERY IMPORTANT, THAT EXACT LINE.
- the timescript stamp is a bit silly but
    - get github log (offline)
    - get GitHub API (official online logs)
    - compare hashes to make sure they match
    - generate json file
- astro file: automate own url/slug, use that to find timestamps
check the package.json file for 
    "predev": "node src/utility/gitTimestamps.js", <--- runs whenever you do npm dev
        REMOVE IT IF YOU'RE RESTARTING FREQUENTLY. i can only send so many access requests per hour.
    "prebuild": "node src/utility/gitTimestamps.js", <--- runs whenever build is done (pushing to github - thank you netlify)
- if you change repo name or username, update in gitTimestamps.js

- if your JSX isnt working try client:load or client:visible

## Layouts and themes

you can nest layouts for reusable themes.

``` sh
---
// src/layouts/WritingSectionALayout.astro
import ThemeSectionA from './ThemeSectionA.astro';
import WritingPageLayout from './WritingPageLayout.astro';
---

<ThemeSectionA>
  <WritingPageLayout>
    <slot />
  </WritingPageLayout>
</ThemeSectionA>
```

themes are supposed to be non descript, whilst "home", "writing", etc. are more juicy with actual
like... content, charset, title

## Docs API
it's totally unsafe to store keys in a public repo,
so i'm having to save my service account key in an environment var
in netlify (and non-synced env on my machine :))
