import { Spin } from 'antd';
import * as React from 'react';

interface VideoContentProps {
    visible: boolean;
    loading: boolean;
    content: any;
}

export const VideoContent = (props: VideoContentProps) => {
    return(
        props.visible ?
            <Spin spinning={props.loading}>
            </Spin>
        : null
    );
}