


import { Pubsub } from './pubsub.js';

export const AllNoti = (() => {

    const render = (target_container) => {
        let wrap_allNoti = document.createElement('ul')
        wrap_allNoti.classList.add('wrap_allNoti')
        target_container.append(wrap_allNoti)

        let target_ul = document.querySelector('.wrap_allNoti')
        Pubsub.subscribe('publish_restaurant', "default", (title, time) => AllNoti.send_noti(target_ul, title, time))
        Pubsub.subscribe('publish_event', "default", (title, time) => AllNoti.send_noti(target_ul, title, time))
    }
    const send_noti = (target_ul, title, time) => {
        let template = document.querySelector('.template_li_inAll');
        let html__li = template.content.cloneNode(true).querySelector('li')

        let html__title = html__li.querySelector('.title_inAll')
        let html__time = html__li.querySelector('.time_inAll')

        html__title.textContent = title
        html__time.textContent = time

        console.log(target_ul);
        target_ul.prepend(html__li)
    }
    return {render, send_noti}
})()