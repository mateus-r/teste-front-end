import { DislikeFilled, EyeFilled, LikeFilled, LoadingOutlined } from '@ant-design/icons';
import { Col, message, Row, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { loadDetails, VideoListResponse } from './actions';
import './styles.less';

export const VideoContent = () => {

    interface ParamTypes { 
        id: string
    }
    const { id } = useParams<ParamTypes>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<VideoListResponse>();

    React.useEffect(() => {
        setLoading(true);
        loadDetails(id)
        .then((res) => {
            console.log(res);
            setResult(res);
        })
        .catch((err) => {
            console.log(err);
            message.error("Erro");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    return(
        <Spin spinning={loading} indicator={<LoadingOutlined style={{fontSize: '48px'}}/>}>
            {
            result ?
                <Row justify='center'  style={{marginTop: '24px'}}>
                    <Col xs={22} sm={20} md={14}>
                        <div className='video-container'>
                            <iframe src={`https://www.youtube.com/embed/${result.id}`}
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title={result.title}
                                className='video'
                            />
                        </div>
                        <Title level={2}>{result.title}</Title>
                        <Row justify='space-between'>
                            <Col>
                                <Text><EyeFilled /> {result.viewCount} visualizações • { moment(result.publishedAt).format('ll')} </Text>
                            </Col>
                            <Col>
                                <LikeFilled />{result.likeCount}<DislikeFilled style={{paddingLeft: '1em'}}/>{result.dislikeCount}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Title level={4}>{result.channelTitle}</Title>
                        </Row>
                        <Row>
                            {result.description}
                        </Row>
                    </Col>
                </Row>
            :
                loading ? null : <ErrorMessage />
            }
        </Spin>
    );
}