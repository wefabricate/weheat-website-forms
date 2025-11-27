'use client';

import { Suspense } from 'react';
import { InstallerIntakeForm } from '../../../components/InstallerIntakeForm';

export default function ScheduleIntakePage() {
  return (
    <main className="min-h-screen bg-offwhite-50">
      <Suspense>
        <InstallerIntakeForm />
      </Suspense>
    </main>
  );
}
