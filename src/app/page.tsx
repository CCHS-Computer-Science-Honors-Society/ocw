"use client";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="animate-float relative mx-auto mb-12 w-full max-w-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/undraw_under_construction_-46-pa%20(1)-O48JHKdqH0CZePwsA4AzkeWetVYco7.svg"
            alt="Under Construction Illustration"
            className="h-auto w-full"
          />
        </div>
        <h1 className="animate-fade-in mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Under Construction
        </h1>
        <p className="animate-fade-in-delay mb-8 text-lg text-gray-600 md:text-xl">
          We're building something amazing. Check back soon!
        </p>
        <div className="animate-pulse-slow">
          <div className="mx-auto h-1 w-16 rounded-full bg-red-500"></div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
