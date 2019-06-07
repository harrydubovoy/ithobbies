import React from "react"
import { notification, Icon } from 'antd';

export const notificationType = {
  success: {
    message: 'Done!',
    icon: {
      name: 'check',
      color: '#d3f261'
    }
  },
  warning: {
    message: 'Oops.',
    icon: {
      name: 'exclamation',
      color: '#ffc069'
    }
  },
  error: {
    message: 'Oh no!',
    icon: {
      name: 'close',
      color: '#ff7875'
    }
  },
};

export function Notification(description, type) {

  notification.open({
    message: notificationType[type].message,
    description,
    icon: <Icon type={notificationType[type].icon.name} style={{ color: notificationType[type].icon.color }} />,
  });
}