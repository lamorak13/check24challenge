import { useParams } from '@solidjs/router';
import { Component } from 'solid-js';

const Community: Component = () => {
    const params = useParams();

    return <div>Single Community with id {params.id}</div>;
};

export default Community;
