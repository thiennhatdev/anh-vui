'use strict';

/**
 * notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', ({ strapi }) => ({
    async readNotifications(ctx) {
        try {
          const userId = ctx.state.user.id;
          const entries = await strapi.db.query("api::notification.notification").findMany({
            where: {
              toUserId: userId,
              isRead: false,
            },
          });
          entries.map(item => (item.id))
          await strapi.db.query("api::notification.notification").updateMany({
            where: {
              id: entries.map(item => item.id)
            },
            data: {
              isRead: true,
            }
          });

          ctx.body = {
            status: 200,
            message: "Đọc tất cả thông báo thành công!"
          };
        } catch (error) {
          ctx.body = {
            message: error?.message
          }
        }
    },
  }));
