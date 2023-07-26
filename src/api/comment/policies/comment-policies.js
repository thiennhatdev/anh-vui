module.exports = async (policyContext, config, { strapi }) => {
    const commentId = policyContext['params'].id;
    const commentOfUser = await strapi.entityService.findOne('api::comment.comment', commentId, {
        populate: "*",
    })
    if (commentOfUser.userId.id === policyContext['state'].user.id) {
        return true
    }

    return false; 
};