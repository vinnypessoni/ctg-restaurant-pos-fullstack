This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

You can run the front end independently of the backend.

To run the frontend standalone, you have a couple of options depending on whether you want to run it directly on your machine or in a Docker container. I'll explain both methods:

### 1. Running directly on your machine (recommended for development):


First, navigate to the frontend directory:

```shellscript
cd restaurant-pos-frontend
```

Install dependencies (if you haven't already):

```shellscript
npm install
```

Start the development server:

```shellscript
npm run dev
```

This will start the Next.js development server, typically on [http://localhost:3000](http://localhost:3000). 

The development server includes features like hot reloading, which is very useful during development.

If you want to build and run the production version:

```shellscript
npm run build
npm start
```





This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
