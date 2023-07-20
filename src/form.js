

import {Func} from "./functions.js"
import { Pubsub } from './pubsub.js';

export const Form = (() => {

    const render_restaurantForm = (target_container) => {
        renderForm(target_container, 'restaurant', (e) => publish(e, 'restaurant'));
    };
    const render_eventForm = (target_container) => {
        renderForm(target_container, 'event', (e) => publish(e, 'event'));
    };
    const renderForm = (target_container, templateClass, publishCallback) => {
      let template = document.querySelector(`.template_form.${templateClass}`);
      let form = template.content.cloneNode(true);
      form.querySelector('button').addEventListener('click', publishCallback);
      target_container.appendChild(form);
    };
    const publish = (e, type) => {
        e.preventDefault();
        let input = e.currentTarget.parentElement.querySelector('input[type="text"]');
        let title = input.value;
        if (title == "") return;
        Pubsub.publish(`publish_${type}`, `New ${type} "${title}"`, Func.get_time())
        input.value = '';
      };
  
    return {render_restaurantForm, render_eventForm};
})();
