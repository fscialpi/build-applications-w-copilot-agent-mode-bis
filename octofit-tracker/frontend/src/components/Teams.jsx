import ResourcePage from './ResourcePage.jsx'

// Expected endpoint: -8000.app.github.dev/api/teams

export default function Teams() {
  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      description="Team composition and goals powered by the backend API and Codespaces-aware URLs."
      emptyMessage="No teams are available yet."
      fields={[
        { label: 'Team', key: 'name' },
        { label: 'Coach', key: 'coach' },
        {
          label: 'Members',
          value: (item) => `${Array.isArray(item.members) ? item.members.length : 0} athletes`,
        },
        { label: 'Focus', key: 'focus' },
        {
          label: 'Weekly goal',
          value: (item) => `${item.weeklyGoalMinutes ?? '—'} min`,
        },
        { label: 'Badge', key: 'badgeColor' },
      ]}
    />
  )
}