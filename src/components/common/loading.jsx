import { Loader2 } from 'lucide-react';

export const Loading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold mt-4 animate-pulse">Loading...</h2>
    </div>
);
