import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class NotificationService {
    static success(message) {
        store.addNotification({
            message: message,
            type: 'default',                         // 'default', 'success', 'info', 'warning'
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