type members = {
    id: number | null
}
let isUserParticipant = (chatMembers: Array<members> | null, id: number) => {
    let check = false
    chatMembers?.map(m => {
        if (m.id === id) check = true
        return m
    })
    return check
}
export default isUserParticipant