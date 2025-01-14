
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PageNotFound = () => {
  return (
<div className='flex bg-slate-900 w-screen h-screen justify-center items-center'>
<Card className="w-full max-w-md mx-4">
      <CardHeader>
        <CardTitle>Page Not Found</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <NotFoundAnimation />
          <p className="text-gray-500">Oops, the page you're looking for doesn't exist.</p>
          <a href="/" className="text-blue-500 font-bold hover:underline">
            Go back to the homepage
          </a>
        </div>
      </CardContent>
    </Card>
</div>
  );
};

const NotFoundAnimation = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-64 h-64 animate-bounce"
    >
      <path
        d="M200 50c82.8 0 150 67.2 150 150s-67.2 150-150 150S50 282.8 50 200 117.2 50 200 50Z"
        fill="#F3F4F6"
      />
      <path
        d="M180 290c-45.3 0-82-36.7-82-82s36.7-82 82-82 82 36.7 82 82-36.7 82-82 82Z"
        fill="#6B7280"
      />
      <path
        d="M195 195a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"
        fill="#F9FAFB"
      />
      <path
        d="M180 220a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"
        fill="#F9FAFB"
      />
      <path
        d="M165 195a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"
        fill="#F9FAFB"
      />
      <path
        d="M180 170a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"
        fill="#F9FAFB"
      />
      <path
        d="M180 120c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80Z"
        fill="#9CA3AF"
      />
      <path
        d="M190 190a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
        fill="#F3F4F6"
      />
      <path
        d="M170 160a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
        fill="#F3F4F6"
      />
      <path
        d="M160 190a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
        fill="#F3F4F6"
      />
      <path
        d="M170 220a10 10 0 1 0 20 0 10 10 0 0 0-20 0Z"
        fill="#F3F4F6"
      />
    </svg>
  );
};

export default PageNotFound;