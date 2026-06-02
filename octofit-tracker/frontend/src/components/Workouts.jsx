import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      description="Suggested workouts surfaced from the backend with graceful handling for list and paginated APIs."
      emptyMessage="No workouts are available yet."
      fields={[
        { label: 'Title', key: 'title' },
        { label: 'Focus area', key: 'focusArea' },
        { label: 'Difficulty', key: 'difficulty' },
        {
          label: 'Duration',
          value: (item) => `${item.durationMinutes ?? '—'} min`,
        },
        {
          label: 'Equipment',
          value: (item) => (Array.isArray(item.equipment) ? item.equipment.join(', ') : '—'),
        },
        { label: 'Description', key: 'description' },
      ]}
    />
  )
}