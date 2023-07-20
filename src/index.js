

import { Form } from "./form.js"
import { User } from "./user.js"
import { Pubsub } from './pubsub.js';
import { AllNoti } from './allNoti.js';

document.addEventListener('DOMContentLoaded', () => {
    const left = document.querySelector('aside')
    const right = document.querySelector('main')

    Form.render_restaurantForm(left)
    Form.render_eventForm(left)
    AllNoti.render(left)
    User.create(right, 'Jenronimo', "./assets/userImg_1.jpg")
    User.create(right, 'Roberto', "./assets/userImg_2.jpg")
    // Pubsub.publish(`publish_event`, `New event "Baskeball game"`, '13:45 PM')
})