"use client";

import { Suspense } from 'react';
import { MultiStepForm } from '../../components/MultiStepForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-offwhite-50">
      <Suspense>
        <MultiStepForm />
      </Suspense>
    </main>
  );
}
