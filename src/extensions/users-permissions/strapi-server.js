module.exports = (plugin) => {

    // custom controller
    plugin.controllers.user.updateMe = async (ctx) => {
        if (!ctx.state.user || !ctx.state.user.id) {
            console.log(ctx.state.user, 'ctx.state.user')
            return ctx.response.status = 401
        }

        await strapi.query('plugin::users-permissions.user').update({
            where: { id: ctx.state.user.id },
            data: ctx.request.body
        }).then(res => {
            ctx.response.status = 200
            ctx.response.data = res;
        })

        return {
            status: ctx.response.status
        }
    }

    // custom route
    plugin.routes["content-api"].routes.push(
        {
            method: "PUT",
            path: "/user/me",
            handler: "user.updateMe",
            config: {
                prefix: "",
                policies: []
            }
        })

    return plugin
};