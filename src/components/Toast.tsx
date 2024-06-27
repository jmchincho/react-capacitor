import React from 'react';
import { Toast } from '@capacitor/toast';

const ToastComponent: React.FC = () => {

    const showHelloToast = async () => {
        await Toast.show({
            text: 'Hello!',
        });
    };

    return (
        <div>
            <button onClick={showHelloToast}>Show Toast</button>
        </div>
    );
};

export default ToastComponent;
