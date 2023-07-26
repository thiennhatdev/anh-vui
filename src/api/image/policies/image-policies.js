module.exports = async (policyContext, config, { strapi }) => {
    const imageId = policyContext['params'].id;
    const imageOfUser = await strapi.entityService.findOne('api::image.image', imageId, {
        populate: "*",
    })
    if (imageOfUser.userId.id === policyContext['state'].user.id) {
        return true
    }

    return false; 
};