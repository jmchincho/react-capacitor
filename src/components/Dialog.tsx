import React from 'react';
import { Dialog } from '@capacitor/dialog';

const DialogComponent: React.FC = () => {

    const showAlert = async () => {
        await Dialog.alert({
            title: 'Stop',
            message: 'This is an error',
        });
    };

    const showConfirm = async () => {
        const { value } = await Dialog.confirm({
            title: 'Confirm',
            message: `Are you sure you'd like to press the red button?`,
        });

        console.log('Confirmed:', value);
    };

    const showPrompt = async () => {
        const { value, cancelled } = await Dialog.prompt({
            title: 'Hello',
            message: `What's your name?`,
        });

        console.log('Name:', value);
        console.log('Cancelled:', cancelled);
    };

    return (
        <div>
            <button onClick={showAlert}>Show Alert</button>
            <button onClick={showConfirm}>Show Confirm</button>
            <button onClick={showPrompt}>Show Prompt</button>
        </div>
    );
};

export default DialogComponent;
