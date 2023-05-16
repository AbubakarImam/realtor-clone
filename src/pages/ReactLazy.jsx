import { lazy, Suspense } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <MyComponent />
            </Suspense>
        </div>
    );
}
