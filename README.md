# IGtUB

A platform that showcases South African open source projects, ranks them by real project health, and matches contributors to projects based on genuine skill fit, with offline support for users with limited connectivity.

## The Problem

South Africa has strong open source talent, but local projects struggle with visibility and often stall from a lack of maintainers. GitHub's star based ranking favours large, well networked projects, leaving smaller, high need local projects overlooked. Meanwhile, connectivity and data cost remain real barriers for many South African developers wanting to contribute.

## The Solution

IGtUB closes that gap by combining discovery, matching, and low friction access into one pipeline.

- **Project Priority Score**, projects are ranked by commit velocity, issue response time, and maintainer bus factor risk, so critical, understaffed projects surface ahead of well resourced ones
- **Automated skill matching**, a contributor's GitHub history is parsed to detect their tech stack, then matched against projects whose open issues need that skill set
- **GitHub based discovery and import**, projects are found and imported directly from GitHub
- **Local Git analysis**, imported repos are cloned and analysed directly for accurate, current activity signals
- **Offline browsing and bookmarking**, project listings are cached locally, and bookmarked adoptions sync automatically once back online

## Features

| Feature | Description |
|---|---|
| Showcase feed | Projects ranked by Project Priority Score |
| Project detail view | Score breakdown, contributors, open issues |
| Skill matching | Personalised project suggestions based on a contributor's detected stack |
| GitHub import | Submit a repo URL to add it to the platform |
| Bookmarking | Save projects to adopt later, works offline with deferred sync |

<!--
## Tech Stack

- **Backend:** _TBD_
- **Frontend:** _TBD_
- **Database:** PostgreSQL
- **Version control analysis:** Git (local clone and analysis)
- **Discovery:** GitHub API

## Security

IGtUB follows a Secure Software Development Lifecycle, including input validation on all endpoints, isolated processing of cloned repositories, least privilege API access, and dependency vulnerability scanning.

## License

IGtUB's core platform is released under **AGPL v3**. Enterprises requiring a private deployment without AGPL's source disclosure obligations may purchase a commercial license.
-->

## Team

- [Tlotliso Ledwaba](https://github.com/Di-exGeneral)
- [Excellent Mashego](https://github.com/DE-night-sheperd)

