
async function getUser(userId) {
  let user = await this.app.redis.get(`SHANARA:USER:${userId}`)
  if (!user) {
    const user = await fetch(`https://discord.com/api/v9/users/${id}`, {
      headers: {
        Authorization: `Bot ${this.app.config.discord.botToken}`
      }
    })
    if (!response.ok) throw new Error(`Error status code: ${response.status}`)
    user = JSON.parse(await response.json())
  } else user = JSON.parse(user)
  return user
}
module.exports = {
  getUser
}


