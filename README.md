# Next.js LangChain Portfolio

This is a portfolio web application built with Next.js, TypeScript, Tailwind CSS, and LangChain. It showcases AI-powered chat features and personal information, designed for modern web standards and scalability.

## Features
- AI ChatBox powered by LangChain
- Responsive design with Tailwind CSS
- Modular component structure
- AstraDB integration
- Pages: About, Skills, Privacy

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
git clone https://github.com/rainerhamal/nextjs-langchain-portf.git
cd nextjs-langchain-portf
```
2. Install dependencies:
   ```sh
npm install
# or
yarn install
```

### Running the Development Server
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Building for Production
```sh
npm run build
npm start
```

## Project Structure
- `src/app/` - Main application pages and layout
- `src/components/` - Reusable UI components
- `src/lib/` - Utility libraries and database integration
- `public/` - Static assets
- `scripts/` - Utility scripts (e.g., vector generation)

## Customization
- Update content in `src/app/about/page.tsx`, `src/app/skills/page.tsx`, etc.
- Modify chat logic in `src/components/AIChatBox.tsx` and backend in `src/app/api/chat/route.ts`

## License
This project is licensed under the MIT License.

## Author
Rainer Hamal

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
