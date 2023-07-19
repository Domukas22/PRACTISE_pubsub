

export const Func = (() => {
    const generate_id = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000); 
    }

    const get_time = () => {
        return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    }

    return {
        generate_id,
        get_time
    }

})()