
import { Func } from "./functions.js"
import { Pubsub } from './pubsub.js';

export const User = (() => {

    let template = document.querySelector(".template_user")
    let template_noti = document.querySelector(".template_user_noti")
    
    const create = (target_container, name, img_src) => {
        let user_id = Func.generate_id()
        let html__userWrap = template.content.cloneNode(true).querySelector('.user');
        html__userWrap.setAttribute("data-id", user_id)

        let html__username = html__userWrap.querySelector('.user_top .user_top_left .user_name')
        let html__user_img = html__userWrap.querySelector('.user_top .user_top_left .user_img')

        html__username.textContent = name
        html__user_img.setAttribute("src", img_src)

        let html__btn_restaurant = html__userWrap.querySelector('.user_top .user_top_right button[data-news="restaurant"]')
        let html__btn_event = html__userWrap.querySelector('.user_top .user_top_right button[data-news="event"]')

        html__btn_restaurant.addEventListener('click', (e) => User.toggle_sub(e, "publish_restaurant", user_id))

        // // // // // // // // subscribe poeple with btns


        target_container.appendChild(html__userWrap)
        // Pubsub.subscribe('publish_event', (title, date) => User.send_noti(user_id, title, date))
        // Pubsub.subscribe('publish_restaurant', (title, date) => User.send_noti(user_id, title, date))
    }

 
    const toggle_sub = (e, event_title, user_id) => {
        e.preventDefault()
        let target = e.currentTarget
        let isSub = target.dataset.sub == "true"

        if (!isSub) {
            Pubsub.subscribe(event_title, user_id, (title, date) => User.send_noti(user_id, title, date))
            target.dataset.sub = "true"
            if (!target.classList.contains('active')) {target.classList.add('active')}
            return
        }
        Pubsub.unsubscribe(event_title, user_id)
        target.dataset.sub = "false"
        if (target.classList.contains('active')) {target.classList.remove('active')}
    }

    const send_noti = (user_id, title, date) => {
        console.log('rs');

        let noti_id = Func.generate_id()
        let html__user_noti = template_noti.content.cloneNode(true).querySelector('.user_noti');
        html__user_noti.setAttribute("data-id", noti_id)

        let html__user_noti_title = html__user_noti.querySelector('.user_noti_left .user_noti_title')
        let html__user_noti_date = html__user_noti.querySelector('.user_noti_left .user_noti_date')
        html__user_noti_title.textContent = title
        html__user_noti_date.textContent = date

        let btn_delete_noti = html__user_noti.querySelector('.user_notification_right .user_btn.delete')
        btn_delete_noti.addEventListener('click', (e) => {delete_noti(e, noti_id)})

        let html__notiBox = document.querySelector(`[data-id="${user_id}"] .user_bottom .wrap_notifcations`)
        html__notiBox.prepend(html__user_noti)
        
    }
    const delete_noti = (e, id) => {
        e.preventDefault()
        const notification = document.querySelector(`.user_noti[data-id="${id}"]`)
        console.log(notification);
        const notification_parent = notification.parentElement
        notification_parent.removeChild(notification)
    }

    
    return {
        create,
        send_noti,
        toggle_sub
    }

})()