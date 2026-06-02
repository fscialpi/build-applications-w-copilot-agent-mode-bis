import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  return (
    <ResourcePage
      resource="users"
      title="Users"
      description="Tracked athlete profiles returned from /api/users/ and compatible with paginated payloads."
      emptyMessage="No users were found."
      fields={[
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Role', key: 'role' },
        { label: 'Team', key: 'teamName' },
        { label: 'Points', key: 'totalPoints' },
        { label: 'Level', key: 'level' },
      ]}
    />
  )
}