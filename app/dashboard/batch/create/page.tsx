// app/batches/new/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CreateBatchCatalog from '@/components/batch/CreateNewBatches'; // adjust path if needed

const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Computer Science'];

export default function Page() {
  const router = useRouter();

  return (
    <CreateBatchCatalog
      subjects={subjects}
      weekDays={weekDays}
      onAddAutoBatches={(newBatches) => {
        console.log('Auto-generated batches:', newBatches);
        // Handle the auto-generated batches (e.g., save to state or send to backend)
      }}
      onCreateBatch={(batch) => {
        console.log('Created batch:', batch);
        // Handle the created batch (e.g., save to state or send to backend)
        router.push('/dashboard/batches'); // Redirect after creation
      }}
    //   onCancel={() => router.push('/dashboard/batches/new')} // Redirect on cancel
    />
  );
}
