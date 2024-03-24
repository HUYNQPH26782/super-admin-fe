import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import { NotificationType } from '../../interface/constants/type/Type.const';



interface NotificationContextType {
  openNotification: (type: NotificationType, message: string, description: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<any> = ({ children }) => {
  const openNotification = (type: NotificationType, message: string, description: string) => {
    notification[type]({
      message,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
