import React from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

const Notification: React.FC = () => {

    const requestPermission = async () => {
        const granted = await LocalNotifications.requestPermissions();
        if (granted.display === 'granted') {
            console.log('Permiso para notificaciones concedido.');
        } else {
            console.log('Permiso para notificaciones denegado.');
        }
    };

    const scheduleNotification = async () => {

        await LocalNotifications.schedule({
            notifications: [
                {
                    title: "Título de la Notificación 2",
                    body: "Cuerpo de la notificación 2",
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000 * 5) }, // Notificación en 5 segundos
                    sound: undefined,
                    attachments: undefined,
                    actionTypeId: "",
                    extra: null
                }
            ]
        });
    };

    const handleNotificationClick = async () => {
        await requestPermission();
        await scheduleNotification();
    };

    React.useEffect(() => {
        LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
            console.log('Notificación clicada:', notification);
        });
    }, []);

    return (
        <button onClick={handleNotificationClick}>
            Enviar Notificación
        </button>
    );
};

export default Notification;
