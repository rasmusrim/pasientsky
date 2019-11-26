import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class NotificationService {
    
    /**
     * Shows a success notification with the given message
     * 
     * @param {String} message 
     */
    static success(message) {
        store.addNotification({
            message: message,
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })

    }

    /**
     * Shows an error notification with the given message
     * 
     * @param {String} message 
     */
    static error(message) {
        store.addNotification({
            message: message,
            type: 'warning',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })

    }

}

export default NotificationService;