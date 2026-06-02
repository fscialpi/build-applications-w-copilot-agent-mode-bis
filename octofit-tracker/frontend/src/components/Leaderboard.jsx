import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      description="Top athletes and their current weekly rank with Mongoose-backed data."
      emptyMessage="The leaderboard is currently empty."
      fields={[
        { label: 'Rank', key: 'rank' },
        { label: 'User', value: (item) => item.user?.name ?? '—' },
        { label: 'Points', key: 'points' },
        { label: 'Streak', value: (item) => `${item.streakDays ?? '—'} days` },
        { label: 'Period', key: 'period' },
      ]}
    />
  )
}