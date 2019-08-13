import { notification } from 'antd';

export const Notification = (type,message,title) => {
    notification[type]({
      message: message,
      description: title,
    });
};