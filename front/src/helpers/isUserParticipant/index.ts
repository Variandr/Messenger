const isUserParticipant = (chatMembers: Array<{ id: number | null }> | null, id: number) => {
  let check = false;
  chatMembers?.map((m) => {
    if (m.id === id) check = true;
    return m;
  });
  return check;
};
export default isUserParticipant;
