//https://dummyjson.com/docs/users

export async function fetchCharacters() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const results = await response.json();
        return results.users;
        
    } catch (error) {
        return null;
    }
}