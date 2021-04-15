const newBasketsToLoggedUser = (loggedUsersBaskets, userId) => {
const notReadBaskets = loggedUsersBaskets.filter(basket => !basket.read);
    const newToRequestor = ["accepted", "rejected", "failedByRequestor", "successByTarget", "success"];
    const newToTarget = ["pending", "cancelled", "failedByTarget", "successByRequestor", "success"];
    const createdByLoggedUser = notReadBaskets.filter(
      (basket) => basket.createdByUserId._id === userId && newToRequestor.includes(basket.status));
    const createdByOtherUser = notReadBaskets.filter(
      (basket) => basket.createdByUserId._id !== userId && newToTarget.includes(basket.status)
    );
    return createdByLoggedUser.concat(createdByOtherUser);
}

export default newBasketsToLoggedUser;