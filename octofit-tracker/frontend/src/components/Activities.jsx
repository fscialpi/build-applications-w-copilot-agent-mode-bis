import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  return (
    <ResourcePage
      resource="activities"
      title="Activities"
      description="Recent workouts and logged movement sessions streamed from the backend API."
      emptyMessage="No activities have been logged yet."
      fields={[
        { label: 'Type', key: 'type' },
        { label: 'User', value: (item) => item.user?.name ?? item.userName ?? '—' },
        { label: 'Duration', value: (item) => `${item.durationMinutes ?? '—'} min` },
        {
          label: 'Calories',
          value: (item) => `${item.caloriesBurned ?? '—'} kcal`,
        },
        { label: 'Intensity', key: 'intensity' },
        {
          label: 'Completed',
          value: (item) => (item.completedAt ? new Date(item.completedAt).toLocaleString() : '—'),
        },
      ]}
    />
  )
}