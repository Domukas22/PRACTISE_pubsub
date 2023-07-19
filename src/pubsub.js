

export const Pubsub = (() => {

    let events = {}

    const subscribe = (event_name, user_id, fn) => {
        events[event_name] = events[event_name] || []
        const obj = {user_id: user_id, fn: fn}
        events[event_name].push(obj)
        
        console.log(`Sub for ${event_name}`);
    }

    const unsubscribe = (event_name, user_id) => {
        if (events[event_name]) {
            events[event_name] = events[event_name].filter(obj_inArray => obj_inArray.user_id !== user_id)
            console.log(`Unsub for ${event_name}`);
        }
    }

    const publish = (event_name, noti_title, date) => {
        
        if (events[event_name]) {
            for (const obj of events[event_name]) {
                obj.fn(noti_title, date)
            }
        }
    }

    

    return {
        subscribe,
        unsubscribe,
        publish

    }
})()