

export const Pubsub = (() => {

    let events = {}

    const subscribe = (event_name, user_id, fn) => {
        events[event_name] = events[event_name] || []
        const obj = {user_id: user_id, fn: fn}
        events[event_name].push(obj)
    }
    const unsubscribe = (event_name, user_id) => {
        if (!events[event_name]) {return}
        events[event_name] = events[event_name].filter(obj_inArray => obj_inArray.user_id !== user_id)
    }
    const publish = (event_name, noti_title, date) => {
        if (!events[event_name]) {return}
        for (const obj of events[event_name]) {
            obj.fn(noti_title, date)
        }
    }
    return {subscribe, unsubscribe, publish}
})()