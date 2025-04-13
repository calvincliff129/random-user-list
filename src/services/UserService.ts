export class UserService {
  
  // get list of new offer meetings
  static async getRandomUserList(page: number) {
    const url: string = `https://randomuser.me/api/?page=${page}&results=20`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length > 0) {
        return data;
      } else console.error("Error fetching users:", data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
    
  }
}

export default UserService;
