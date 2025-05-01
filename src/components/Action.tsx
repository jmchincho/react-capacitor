import React from 'react';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';



const ActionComponent: React.FC = () => {
    const showActions = async () => {
        const result = await ActionSheet.showActions({
            title: 'Photo Options',
            message: 'Select an option to perform',
            options: [
                {
                    title: 'Upload',
                },
                {
                    title: 'Share',
                },
                {
                    title: 'Remove',
                    style: ActionSheetButtonStyle.Destructive,
                },
            ],
        });

        console.log('Action Sheet result:', result);
    };

    return (
        <div>
            <button onClick={showActions}>Show Action</button>
        </div>
    );
};

export default ActionComponent;
