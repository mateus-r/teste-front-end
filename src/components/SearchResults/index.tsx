import { Spin } from 'antd';
import * as React from 'react';

interface SearchResultsProps {
    visible: boolean;
    loading: boolean;
    content: any[] | string;
    onClick: (e: string) => void;
}

export const SearchResults = (props: SearchResultsProps) => {
    return(
        props.visible ?
            <Spin spinning={props.loading}>
                {
                props.content instanceof String ?
                    <>
                        Erro: {props.content}
                    </>
                : props.content
                }
            </Spin>
        : null
    );
}