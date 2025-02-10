export default async function Page() {
    const response = await fetch('http://localhost:3000/api/users/data');

    if (!response.ok) {
        return <div>Error: {response.status}</div>;
        }
    
        const users = await response.json();
    
        return (
        <main>
            <h1>List Users</h1>
            <ul>
            {users.map((user: { id: string; username: string; name: string; address: string; phone: string }) => (
                <li key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.name}</p>
                    <p>{user.address}</p>
                    <p>{user.phone}</p>
                </li>
            ))}
            </ul>
        </main>
    );
}